import db from '../database';
import errLogger from '../utilities/errLogger';
import config from '../config';

export type Status = {
    id: number;
    name: string;
};

export class StatusStore {
    async index(): Promise<Status[] | null> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM statuses';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            errLogger.error(config.msgFailGtItm + err);
            return null;
        }
    }

    async show(id: string): Promise<Status | null> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM statuses WHERE id = $1';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            errLogger.error(config.msgFailFdItm + id + config.msgFailError + err);
            return null;
        }
    }

    async create(i: Status): Promise<Status | null> {
        try {
            const conn = await db.connect();
            const sql = 'INSERT INTO statuses (name) VALUES ($1) RETURNING *';
            const result = await conn.query(sql, [i.name]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            errLogger.error(config.msgFailAdItm + i.name + config.msgFailError + err);
            return null;
        }
    }

    async update(i: Status): Promise<Status | null> {
        try {
            const conn = await db.connect();
            const sql = 'UPDATE statuses SET name = $2 WHERE id = $1 RETURNING *';
            const result = await conn.query(sql, [i.id, i.name]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            errLogger.error(config.msgFailUpItm + i.name + config.msgFailError + err);
            return null;
        }
    }

    async delete(id: string): Promise<Status | null> {
        try {
            const conn = await db.connect();
            const sql = 'DELETE FROM statuses WHERE id = $1 RETURNING *';
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
            const sql = 'DELETE FROM statuses;\nALTER SEQUENCE statuses_id_seq restart with 1';
            await conn.query(sql);
            conn.release();
        } catch (err) {
            errLogger.error(config.msgFailTrnct + err);
        }
    }
}
