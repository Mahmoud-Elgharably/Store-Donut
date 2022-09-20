import { Category, CategoryStore } from '../../models/category';
import supertest from 'supertest';
import app from '../../server';
import config from '../../config';

const store = new CategoryStore();
const request = supertest(app);

describe('Category Handler endpoint responses', () => {
    let categoryId = 0;

    it(config.msgGetCret, async () => {
        const category: Category = {
            id: 1,
            name: 'Mobiles',
        };
        const response = await request.post('/categories').send(category);
        expect(response.status).toBe(200);
        categoryId = response.body.id;
    });

    it(config.msgGetIndx, async () => {
        const response = await request.get('/categories');
        expect(response.status).toBe(200);
    });

    it(config.msgGetShow, async () => {
        const response = await request.get(`/categories/${categoryId}`);
        expect(response.status).toBe(200);
    });

    it(config.msgGetUpdt, async () => {
        const category: Category = {
            id: 1,
            name: 'Computers',
        };
        const response = await request.post('/categories').send(category);
        expect(response.status).toBe(200);
        categoryId = response.body.id;
    });

    it(config.msgGetDelt, async () => {
        const response = await request.delete(`/categories/${categoryId}`);
        expect(response.status).toBe(200);
    });

    afterAll(async () => {
        await store.truncate();
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
