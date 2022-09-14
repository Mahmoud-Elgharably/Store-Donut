import db from '../database';
import errLogger from '../utilities/errLogger';

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
            errLogger.error(`Could not get categories. Error: ${err}`);
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
            errLogger.error(`Could not find product (${id}). Error: ${err}`);
            return null;
        }
    }

    async create(c: Category): Promise<Category | null> {
        try {
            const conn = await db.connect();
            const sql = 'INSERT INTO categories (name) VALUES ($1) RETURNING *';
            const result = await conn.query(sql, [c.name]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            errLogger.error(`Could not add new category (${c.name})`);
            return null;
        }
    }

    async update(c: Category): Promise<Category | null> {
        try {
            const conn = await db.connect();
            const sql = 'UPDATE categories SET name = $2 WHERE id = $1 RETURNING *';
            const result = await conn.query(sql, [c.id, c.name]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            errLogger.error(`Could not update the category (${c.name}). Error: ${err}`);
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
            errLogger.error(`Could not delete category (${id}). Error: ${err}`);
            return null;
        }
    }
}