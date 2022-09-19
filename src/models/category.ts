import db from '../database';
import errLogger from '../utilities/errLogger';
import config from '../config';

export type Category = {
    id: number;
    name: string;
};

export class CategoryStore {
    async index(): Promise<Category[] | null> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM categories';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            errLogger.error(config.msgFailGtItm + err);
            return null;
        }
    }

    async show(id: string): Promise<Category | null> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM categories WHERE id = $1';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            errLogger.error(config.msgFailFdItm + id + config.msgFailError + err);
            return null;
        }
    }

    async create(i: Category): Promise<Category | null> {
        try {
            const conn = await db.connect();
            const sql = 'INSERT INTO categories (name) VALUES ($1) RETURNING *';
            const result = await conn.query(sql, [i.name]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            errLogger.error(config.msgFailAdItm + i.name + config.msgFailError + err);
            return null;
        }
    }

    async update(i: Category): Promise<Category | null> {
        try {
            const conn = await db.connect();
            const sql = 'UPDATE categories SET name = $2 WHERE id = $1 RETURNING *';
            const result = await conn.query(sql, [i.id, i.name]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            errLogger.error(config.msgFailUpItm + i.name + config.msgFailError + err);
            return null;
        }
    }

    async delete(id: string): Promise<Category | null> {
        try {
            const conn = await db.connect();
            const sql = 'DELETE FROM categories WHERE id = $1 RETURNING *';
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
            const sql = 'DELETE FROM categories;\nALTER SEQUENCE categories_id_seq restart with 1';
            await conn.query(sql);
            conn.release();
        } catch (err) {
            errLogger.error(config.msgFailTrnct + err);
        }
    }
}
