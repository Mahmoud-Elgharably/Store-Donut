import db from '../database';
import errLogger from '../utilities/errLogger';
import config from '../config';

export type Product = {
    id: number;
    name: string;
    price: number;
    category_id: number;
};

export class ProductStore {
    async index(): Promise<Product[] | null> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            errLogger.error(config.msgFailGtItm + err);
            return null;
        }
    }

    async show(id: string): Promise<Product | null> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM products WHERE id = $1';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            errLogger.error(config.msgFailFdItm + id + config.msgFailError + err);
            return null;
        }
    }

    async create(i: Product): Promise<Product | null> {
        try {
            const conn = await db.connect();
            const sql = 'INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [i.name, i.price, i.category_id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            errLogger.error(config.msgFailAdItm + i.name + config.msgFailError + err);
            return null;
        }
    }

    async update(i: Product): Promise<Product | null> {
        try {
            const conn = await db.connect();
            const sql = 'UPDATE products SET name = $2, price = $3, category_id = $4 WHERE id = $1 RETURNING *';
            const result = await conn.query(sql, [i.id, i.name, i.price, i.category_id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            errLogger.error(config.msgFailUpItm + i.name + config.msgFailError + err);
            return null;
        }
    }

    async delete(id: string): Promise<Product | null> {
        try {
            const conn = await db.connect();
            const sql = 'DELETE FROM products WHERE id = $1 RETURNING *';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            errLogger.error(config.msgFailDtItm + id + config.msgFailError + err);
            return null;
        }
    }

    async truncate(): Promise<void> {
        try {
            const conn = await db.connect();
            const sql = 'DELETE FROM products;\nALTER SEQUENCE products_id_seq restart with 1';
            await conn.query(sql);
            conn.release();
        } catch (err) {
            errLogger.error(config.msgFailTrnct + err);
        }
    }
}
