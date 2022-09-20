import config from '../../config';
import supertest from 'supertest';
import { Status, StatusStore } from '../../models/status';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';
import { Order, OrderProduct, OrderStore } from '../../models/order';
import { Category, CategoryStore } from '../../models/category';
import app from '../../server';

const storeStatus = new StatusStore();
const storeUser = new UserStore();
const storeCategory = new CategoryStore();
const storeProduct = new ProductStore();
const storeOrder = new OrderStore();

const request = supertest(app);
describe('Dashboard Handler endpoint responses', () => {
    const user: User = {
        id: 0,
        first_name: 'Gamal',
        last_name: 'Sad',
        user_name: 'gmy',
        password: '123',
    };
    let token: string;
    let category: Category;
    let statusId: number;
    let productId: number;
    let orderId: number;
    //let orderProductId: number;

    beforeAll(async () => {
        const response = await request.post('/users').send(user);
        token = response.body;

        const respon = await request.post('/users/authenticate').send({
            user_name: 'gmy',
            password: '123',
        });
        user.id = (respon.body as User).id;
        category = await addCategory();
        statusId = await addStatus();
        productId = await addProduct();
        orderId = await addOrder();
    });

    it('gets Add Order Product api endpoint', async () => {
        const orderProduct: OrderProduct = {
            id: 0,
            order_id: orderId,
            product_id: productId,
            quantity: 45,
        };
        const response = await request
            .post(`/orders/${orderId}/products`)
            .send(orderProduct)
            .set('Authorization', config.tokenType + ' ' + token);
        expect(response.status).toBe(200);
        //orderProductId = response.body.id;
    });

    it('gets Show Products api endpoint', async () => {
        const response = await request
            .get(`/users/${user.id}/orders/${orderId}/products`)
            .set('Authorization', config.tokenType + ' ' + token);
        expect(response.status).toBe(200);
    });

    it('gets Top 5 Products api endpoint', async () => {
        const response = await request.get('/products-top-5');
        expect(response.status).toBe(200);
    });

    it('gets Products by category api endpoint', async () => {
        const response = await request.get('/products-by-cat').send({
            category: category.name,
        });
        expect(response.status).toBe(200);
    });

    it('gets Active Order api endpoint', async () => {
        const response = await request
            .get('/active-order')
            .send({
                user_id: user.id,
            })
            .set('Authorization', config.tokenType + ' ' + token);
        expect(response.status).toBe(200);
    });

    it('gets Complete Orders api endpoint', async () => {
        const response = await request
            .get('/complete-orders')
            .send({
                user_id: user.id,
            })
            .set('Authorization', config.tokenType + ' ' + token);
        expect(response.status).toBe(200);
    });

    afterAll(async () => {
        await storeOrder.truncate();
        await storeProduct.truncate();
        await storeStatus.truncate();
        await storeCategory.truncate();
        await storeUser.truncate();
        const result = await storeUser.index();
        expect(result).toEqual([]);
    });

    async function addCategory(): Promise<Category> {
        const result = await storeCategory.create({
            id: 0,
            name: 'Mobiles',
        });
        return result as Category;
    }

    async function addStatus(): Promise<number> {
        const result = await storeStatus.create({
            id: 0,
            name: 'active',
        });
        const { id } = result as Status;
        return id;
    }

    async function addProduct(): Promise<number> {
        const result = await storeProduct.create({
            id: 0,
            name: 'OPPO XI-3200',
            price: 7500,
            category_id: category.id,
        });
        const { id } = result as Product;
        return id;
    }

    async function addOrder(): Promise<number> {
        const result = await storeOrder.create({
            id: 0,
            status_id: statusId,
            user_id: user.id,
        });
        const { id } = result as Order;
        return id;
    }
});
