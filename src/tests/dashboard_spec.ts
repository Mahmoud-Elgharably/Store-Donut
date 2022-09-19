import config from '../config';
import supertest from 'supertest';
import { DashboardQueries } from '../services/dashboard';
import { Status, StatusStore } from '../models/status';
import { User, UserStore } from '../models/user';
import { Product, ProductStore } from '../models/product';
import { Order, OrderProduct, OrderStore } from '../models/order';
import { Category, CategoryStore } from '../models/category';
import app from '../server';

const queriesDashboard = new DashboardQueries();
const storeStatus = new StatusStore();
const storeUser = new UserStore();
const storeCategory = new CategoryStore();
const storeProduct = new ProductStore();
const storeOrder = new OrderStore();

const request = supertest(app);
describe('Dashboard service endpoint responses', () => {
    it('gets Top 5 Products api endpoint', async () => {
        const response = await request.get('/products-top-5');
        expect(response.status).toBe(200);
    });
});

describe('Dashboard Services', () => {
    let sts_id = 0;
    let usr_id = 0;
    let cat_id = 0;
    let prd_id = 0;
    let ord_id = 0;
    it(config.msgShudHvAdp, () => {
        expect(queriesDashboard.addProduct).toBeDefined();
    });

    it(config.msgShudHvShp, () => {
        expect(queriesDashboard.showProducts).toBeDefined();
    });

    it(config.msgShudHvGt5, () => {
        expect(queriesDashboard.getTop5Products).toBeDefined();
    });

    it(config.msgShudHvGtg, () => {
        expect(queriesDashboard.getProductsByCat).toBeDefined();
    });

    it(config.msgShudHvAcu, () => {
        expect(queriesDashboard.getActOrderByUsr).toBeDefined();
    });

    it(config.msgShudHvCcu, () => {
        expect(queriesDashboard.getCmpOrdersByUsr).toBeDefined();
    });

    it(config.msgShudRtPdt, async () => {
        sts_id = await addStatus();
        usr_id = await addUser();
        cat_id = await addCategory();
        prd_id = await addProduct();
        ord_id = await addOrder();
        const result = await queriesDashboard.addProduct(43, prd_id, ord_id);
        const { id, order_id, product_id, quantity } = result as OrderProduct;
        expect(id).toEqual(1);
        expect(order_id.toString()).toEqual(ord_id.toString());
        expect(product_id.toString()).toEqual(prd_id.toString());
        expect(quantity).toEqual(43);
        //expect(result).toEqual({
        //    id: 1,
        //    order_id: ord_id,
        //    product_id: prd_id,
        //    quantity: 43,
        //});
    });

    afterAll(async () => {
        await queriesDashboard.truncateOrderProducts();
        await storeOrder.truncate();
        await storeProduct.truncate();
        await storeCategory.truncate();
        await storeUser.truncate();
        await storeStatus.truncate();
        const result = await storeOrder.index();
        expect(result).toEqual([]);
    });

    async function addStatus(): Promise<number> {
        const result = await storeStatus.create({
            id: 0,
            name: 'complete',
        });
        const { id } = result as Status;
        return id;
    }

    async function addUser(): Promise<number> {
        const result = await storeUser.create({
            id: 0,
            first_name: 'Gamal',
            last_name: 'Sad',
            user_name: 'gmy',
            password: '123',
        });
        const { id } = result as User;
        return id;
    }

    async function addCategory(): Promise<number> {
        const result = await storeCategory.create({
            id: 0,
            name: 'Mobiles',
        });
        const { id } = result as Category;
        return id;
    }

    async function addProduct(): Promise<number> {
        const result = await storeProduct.create({
            id: 0,
            name: 'OPPO XI-3200',
            price: 7500,
            category_id: cat_id,
        });
        const { id } = result as Product;
        return id;
    }

    async function addOrder(): Promise<number> {
        const result = await storeOrder.create({
            id: 0,
            status_id: sts_id,
            user_id: usr_id,
        });
        const { id } = result as Order;
        return id;
    }
});
