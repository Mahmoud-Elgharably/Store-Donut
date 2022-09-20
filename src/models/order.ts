import db from '../database';
import errLogger from '../utilities/errLogger';
import config from '../config';

export type Order = {
    id: number;
    status_id: number;
    user_id: number;
};

export type OrderProduct = {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
};

export class OrderStore {
    async index(): Promise<Order[] | null> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            errLogger.error(config.msgFailGtItm + err);
            return null;
        }
    }

    async show(id: string): Promise<Order | null> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM orders WHERE id = $1';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            errLogger.error(config.msgFailFdItm + id + config.msgFailError + err);
            return null;
        }
    }

    async create(i: Order): Promise<Order | null> {
        try {
            const conn = await db.connect();
            const sql = 'INSERT INTO orders (status_id, user_id) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [i.status_id, i.user_id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            errLogger.error(config.msgFailAdItm + i.id + config.msgFailError + err);
            return null;
        }
    }

    async update(i: Order): Promise<Order | null> {
        try {
            const conn = await db.connect();
            const sql = 'UPDATE orders SET status_id = $2, user_id = $3 WHERE id = $1 RETURNING *';
            const result = await conn.query(sql, [i.id, i.status_id, i.user_id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            errLogger.error(config.msgFailUpItm + i.id + config.msgFailError + err);
            return null;
        }
    }

    async delete(id: string): Promise<Order | null> {
        try {
            const conn = await db.connect();
            const sql = 'DELETE FROM orders WHERE id = $1 RETURNING *';
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
            let sql = 'DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq restart with 1';
            await conn.query(sql);
            sql = 'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq restart with 1';
            await conn.query(sql);
            conn.release();
        } catch (err) {
            errLogger.error(config.msgFailTrnct + err);
        }
    }
}
