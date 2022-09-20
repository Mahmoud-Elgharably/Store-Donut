import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';
import { Category, CategoryStore } from '../../models/category';
import supertest from 'supertest';
import app from '../../server';
import config from '../../config';

const store = new ProductStore();
const storeCategory = new CategoryStore();
const storeUser = new UserStore();
const request = supertest(app);

describe('Product Handler endpoint responses', () => {
    let token: string;
    let cat_id: number;
    let productId: number;

    beforeAll(async () => {
        const user: User = {
            id: 0,
            first_name: 'Gamal',
            last_name: 'Sad',
            user_name: 'gmy',
            password: '123',
        };
        const response = await request.post('/users').send(user);
        token = response.body;

        const respon = await request.post('/users/authenticate').send({
            user_name: 'gmy',
            password: '123',
        });
        user.id = (respon.body as User).id;
    });

    it(config.msgGetCret, async () => {
        cat_id = await addCategory();
        const product: Product = {
            id: 0,
            name: 'OPPO XI-3200',
            price: 7500,
            category_id: cat_id,
        };
        const response = await request
            .post('/products')
            .send(product)
            .set('Authorization', config.tokenType + ' ' + token);
        expect(response.status).toBe(200);
        productId = response.body.id;
    });

    it(config.msgGetIndx, async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });

    it(config.msgGetShow, async () => {
        const response = await request.get(`/products/${productId}`);
        expect(response.status).toBe(200);
    });

    it(config.msgGetUpdt, async () => {
        const product: Product = {
            id: 1,
            name: 'NOKIA 50',
            price: 2100,
            category_id: cat_id,
        };
        const response = await request
            .post('/products')
            .send(product)
            .set('Authorization', config.tokenType + ' ' + token);
        expect(response.status).toBe(200);
        productId = response.body.id;
    });

    it(config.msgGetDelt, async () => {
        const response = await request
            .delete(`/products/${productId}`)
            .set('Authorization', config.tokenType + ' ' + token);
        expect(response.status).toBe(200);
    });

    afterAll(async () => {
        await store.truncate();
        await storeCategory.truncate();
        await storeUser.truncate();
        const result = await store.index();
        expect(result).toEqual([]);
    });

    async function addCategory(): Promise<number> {
        const result = await storeCategory.create({
            id: 0,
            name: 'Mobiles',
        });
        const { id } = result as Category;
        return id;
    }
});
