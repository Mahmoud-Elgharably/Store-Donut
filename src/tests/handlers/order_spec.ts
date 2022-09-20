import { Order, OrderStore } from '../../models/order';
import { User, UserStore } from '../../models/user';
import { Status, StatusStore } from '../../models/status';

import supertest from 'supertest';
import app from '../../server';
import config from '../../config';

const store = new OrderStore();
const storeStatus = new StatusStore();
const storeUser = new UserStore();
const request = supertest(app);

describe('Order Handler endpoint responses', () => {
    const user: User = {
        id: 0,
        first_name: 'Gamal',
        last_name: 'Sad',
        user_name: 'gmy',
        password: '123',
    };
    let orderId = 0;
    let sts_id = 0;
    let token: string;

    beforeAll(async () => {
        const response = await request.post('/users').send(user);
        token = response.body;

        const respon = await request.post('/users/authenticate').send({
            user_name: 'gmy',
            password: '123',
        });
        user.id = (respon.body as User).id;
        sts_id = await addStatus();
    });

    it(config.msgGetCret, async () => {
        const order: Order = {
            id: 0,
            status_id: sts_id,
            user_id: user.id,
        };
        const response = await request
            .post('/orders')
            .send(order)
            .set('Authorization', config.tokenType + ' ' + token);
        expect(response.status).toBe(200);
        orderId = response.body.id;
    });

    it(config.msgGetIndx, async () => {
        const response = await request.get('/orders').set('Authorization', config.tokenType + ' ' + token);
        expect(response.status).toBe(200);
    });

    //it(config.msgGetIndx, async () => {
    //    const response = await request.get('/orders').set('Authorization', config.tokenType + ' ');
    //    expect(response.status).toBe(401);
    //});

    it(config.msgGetShow, async () => {
        const response = await request.get(`/orders/${orderId}`).set('Authorization', config.tokenType + ' ' + token);
        expect(response.status).toBe(200);
    });

    it(config.msgGetUpdt, async () => {
        const order: Order = {
            id: 0,
            status_id: sts_id,
            user_id: user.id,
        };
        const response = await request
            .post('/orders')
            .send(order)
            .set('Authorization', config.tokenType + ' ' + token);
        expect(response.status).toBe(200);
        orderId = response.body.id;
    });

    it(config.msgGetDelt, async () => {
        const response = await request
            .delete(`/orders/${orderId}`)
            .set('Authorization', config.tokenType + ' ' + token);
        expect(response.status).toBe(200);
    });

    afterAll(async () => {
        await store.truncate();
        await storeStatus.truncate();
        await storeUser.truncate();
        const result = await store.index();
        expect(result).toEqual([]);
    });

    async function addStatus(): Promise<number> {
        await storeStatus.create({
            id: 0,
            name: 'active',
        });
        const result = await storeStatus.create({
            id: 0,
            name: 'complete',
        });
        const { id } = result as Status;
        return id;
    }
});
