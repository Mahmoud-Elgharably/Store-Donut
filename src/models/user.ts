import db from '../database';
import errLogger from '../utilities/errLogger';
import config from '../config';
import bcrtpt from 'bcrypt';

export type User = {
    id: number;
    first_name: string;
    last_name: string;
    user_name: string;
    password: string;
};

export class UserStore {
    async index(): Promise<User[] | null> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            errLogger.error(config.msgFailGtItm + err);
            return null;
        }
    }

    async show(id: string): Promise<User | null> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM users WHERE id = $1';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            errLogger.error(config.msgFailFdItm + id + config.msgFailError + err);
            return null;
        }
    }

    async create(i: User): Promise<User | null> {
        try {
            const conn = await db.connect();
            const sql =
                'INSERT INTO users (first_name, last_name, user_name, pwrd_digest) VALUES ($1, $2, $3, $4) RETURNING *';
            const hashPwrd = bcrtpt.hashSync(
                i.password + config.pepper,
                parseInt(config.saltRounds as unknown as string)
            );
            const result = await conn.query(sql, [i.first_name, i.last_name, i.user_name, hashPwrd]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            errLogger.error(config.msgFailAdItm + i.first_name + config.msgFailError + err);
            return null;
        }
    }

    async update(i: User): Promise<User | null> {
        try {
            const conn = await db.connect();
            const sql =
                'UPDATE users SET first_name = $2, last_name = $3, user_name = $4, pwrd_digest = $5 WHERE id = $1 RETURNING *';
            const hashPwrd = bcrtpt.hashSync(
                i.password + config.pepper,
                parseInt(config.saltRounds as unknown as string)
            );
            const result = await conn.query(sql, [i.id, i.first_name, i.last_name, i.user_name, hashPwrd]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            errLogger.error(config.msgFailUpItm + i.first_name + config.msgFailError + err);
            return null;
        }
    }

    async authenticate(user_name: string, password: string): Promise<User | null> {
        const conn = await db.connect();
        const sql = 'SELECT * FROM users WHERE user_name = ($1)';
        const result = await conn.query(sql, [user_name]);
        conn.release();
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrtpt.compareSync(password + config.pepper, user.pwrd_digest)) {
                return {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    user_name: user.user_name,
                    password: '',
                };
            }
        }
        return null;
    }

    async delete(id: string): Promise<User | null> {
        try {
            const conn = await db.connect();
            const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
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
            const sql = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq restart with 1';
            await conn.query(sql);
            conn.release();
        } catch (err) {
            errLogger.error(config.msgFailTrnct + err);
        }
    }
}
