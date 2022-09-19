import db from '../database';
import errLogger from '../utilities/errLogger';
import config from '../config';

export class DashboardQueries {
    async addProduct(
        quantity: number,
        productId: number,
        orderId: number
    ): Promise<{ id: number; order_id: number; product_id: number; quantity: number } | null> {
        try {
            const conn = await db.connect();
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [orderId, productId, quantity]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            errLogger.error(config.msgFailAdPdt + productId + config.msgFailTord + orderId + config.msgFailError + err);
            return null;
        }
    }

    async truncateOrderProducts(): Promise<void> {
        try {
            const conn = await db.connect();
            const sql = 'DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq restart with 1';
            await conn.query(sql);
            conn.release();
        } catch (err) {
            errLogger.error(config.msgFailTrnct + err);
        }
    }

    async showProducts(
        userId: number,
        orderId: number
    ): Promise<{ id: number; order_id: number; product_id: number; quantity: number; status_id: number }[] | null> {
        try {
            const conn = await db.connect();
            const sql =
                'SELECT order_products.id, order_id, product_id, quantity, status_id FROM order_products INNER JOIN orders ON orders.id = order_products.order_id where order_products.order_id=($1) AND orders.user_id=($2)';
            const result = await conn.query(sql, [orderId, userId]);
            conn.release();
            return result.rows;
        } catch (err) {
            errLogger.error(config.msgFailFdPdt + orderId + config.msgFailError + err);
            return null;
        }
    }

    async getTop5Products(): Promise<
        { product_id: number; product_name: string; sold: number; price: number; category_id: number }[] | null
        > {
        try {
            const conn = await db.connect();
            const sql =
                'SELECT tmp_tbl.product_id, products.name as product_name, tmp_tbl.sold, products.price, products.category_id FROM (SELECT product_id, sum(quantity) AS sold FROM order_products GROUP BY product_id LIMIT 5) AS tmp_tbl INNER JOIN products ON tmp_tbl.product_id = products.id ORDER BY sold DESC';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            errLogger.error(config.msgFailGtItm + err);
            return null;
        }
    }

    async getProductsByCat(
        category: string
    ): Promise<{ id: number; name: string; price: number; category_id: number; category_name: string }[] | null> {
        try {
            const conn = await db.connect();
            const sql =
                'SELECT products.id, products.name, products.price, products.category_id, categories.name AS category_name FROM products INNER JOIN categories ON products.category_id = categories.id WHERE categories.name = ($1)';
            const result = await conn.query(sql, [category]);
            conn.release();
            return result.rows;
        } catch (err) {
            errLogger.error(config.msgFailGtItm + err);
            return null;
        }
    }

    async getActOrderByUsr(
        user_id: number
    ): Promise<{ id: number; status_id: number; status_name: string; user_id: number; user_name: string }[] | null> {
        try {
            const conn = await db.connect();
            const sql =
                'SELECT orders.id, orders.status_id, statuses.name AS status_name, orders.user_id, users.user_name AS user_name FROM orders INNER JOIN statuses ON orders.status_id = statuses.id INNER JOIN users ON orders.user_id = users.id WHERE orders.user_id = ($1) AND statuses.name = ($2) ORDER BY orders.id';
            const result = await conn.query(sql, [user_id, 'active']);
            conn.release();
            return result.rows;
        } catch (err) {
            errLogger.error(config.msgFailGtItm + err);
            return null;
        }
    }

    async getCmpOrdersByUsr(
        user_id: number
    ): Promise<{ id: number; status_id: number; status_name: string; user_id: number; user_name: string }[] | null> {
        try {
            const conn = await db.connect();
            const sql =
                'SELECT orders.id, orders.status_id, statuses.name AS status_name, orders.user_id, users.user_name AS user_name FROM orders INNER JOIN statuses ON orders.status_id = statuses.id INNER JOIN users ON orders.user_id = users.id WHERE orders.user_id = ($1) AND statuses.name = ($2) ORDER BY orders.id';
            const result = await conn.query(sql, [user_id, 'complete']);
            conn.release();
            return result.rows;
        } catch (err) {
            errLogger.error(config.msgFailGtItm + err);
            return null;
        }
    }
}
