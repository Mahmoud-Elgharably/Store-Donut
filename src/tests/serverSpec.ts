import supertest from 'supertest';
import app from '../server';
import _ from 'lodash';

it('Should be a sum greater than 7', () => {
    expect(_.add(3, 5)).toBeGreaterThan(7);
});

const request = supertest(app);
describe('Test endpoint responses', () => {
    it('gets the api endpoint', async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
    });
});

/*
const request = supertest(app);
describe('Test endpoint responses (GET /api/images?fnm=santamonica&wdt=650&hit=400)', () => {
    it('Status should be 200', async () => {
        // gets the api endpoint
        const response = await request.get('/api/images?fnm=santamonica&wdt=650&hit=400');
        expect(response.status).toBe(200);
    });
});
*/
