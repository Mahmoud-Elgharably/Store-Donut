import { Status, StatusStore } from '../../models/status';
import supertest from 'supertest';
import app from '../../server';
import config from '../../config';

const store = new StatusStore();
const request = supertest(app);

describe('Status Handler endpoint responses', () => {
    let statusId = 0;

    it(config.msgGetCret, async () => {
        const status: Status = {
            id: 1,
            name: 'active',
        };
        const response = await request.post('/statuses').send(status);
        expect(response.status).toBe(200);
        statusId = response.body.id;
    });

    it(config.msgGetIndx, async () => {
        const response = await request.get('/statuses');
        expect(response.status).toBe(200);
    });

    it(config.msgGetShow, async () => {
        const response = await request.get(`/statuses/${statusId}`);
        expect(response.status).toBe(200);
    });

    it(config.msgGetUpdt, async () => {
        const status: Status = {
            id: 1,
            name: 'complete',
        };
        const response = await request.post('/statuses').send(status);
        expect(response.status).toBe(200);
        statusId = response.body.id;
    });

    it(config.msgGetDelt, async () => {
        const response = await request.delete(`/statuses/${statusId}`);
        expect(response.status).toBe(200);
    });

    afterAll(async () => {
        await store.truncate();
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
