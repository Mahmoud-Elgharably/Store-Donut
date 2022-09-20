import { User, UserStore } from '../../models/user';
import supertest from 'supertest';
import app from '../../server';
import config from '../../config';
//import jwt from 'jsonwebtoken';

const store = new UserStore();
const request = supertest(app);

describe('User Handler endpoint responses', () => {
    let userId: number;
    let token: string;

    it(config.msgGetCret, async () => {
        const user: User = {
            id: 0,
            first_name: 'Gamal',
            last_name: 'Sad',
            user_name: 'gmy',
            password: '123',
        };
        const response = await request.post('/users').send(user);
        expect(response.status).toBe(200);
        token = response.body;
        const respon = await request.post('/users/authenticate').send({
            user_name: 'gmy',
            password: '123',
        });
        userId = respon.body.id;
        //const result = jwt.verify(token, config.tokenSecret as unknown as string);
    });

    it(config.msgGetIndx, async () => {
        const response = await request.get('/users').set('Authorization', config.tokenType + ' ' + token);
        expect(response.status).toBe(200);
    });

    it(config.msgGetShow, async () => {
        const response = await request.get(`/users/${userId}`).set('Authorization', config.tokenType + ' ' + token);
        expect(response.status).toBe(200);
    });

    it(config.msgGetUpdt, async () => {
        const user: User = {
            id: 1,
            first_name: 'Murad',
            last_name: 'Zyad',
            user_name: 'mrd',
            password: '456',
        };
        const response = await request
            .post('/users')
            .send(user)
            .set('Authorization', config.tokenType + ' ' + token);
        expect(response.status).toBe(200);
        const respon = await request.post('/users/authenticate').send({
            user_name: 'mrd',
            password: '456',
        });
        userId = respon.body.id;
    });

    it(config.msgGetAuth, async () => {
        const response = await request.post('/users/authenticate').send({
            user_name: 'mrd',
            password: '456',
        });
        expect(response.status).toBe(200);
    });

    //it(config.msgGetAuth, async () => {
    //    const response = await request.post('/users/authenticate').send({
    //        user_name: 'mrd',
    //        password: '4',
    //    });
    //    expect(response.status).toBe(400);
    //});

    it(config.msgGetDelt, async () => {
        const response = await request.delete(`/users/${userId}`).set('Authorization', config.tokenType + ' ' + token);
        expect(response.status).toBe(200);
    });

    afterAll(async () => {
        await store.truncate();
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
