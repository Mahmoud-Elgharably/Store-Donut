import express, { Request, Response } from 'express';
import verifyAuthToken from '../middlewares/authorization';
import { Order, OrderStore } from '../models/order';
import errLogger from '../utilities/errLogger';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    const orders = await store.index();
    res.json(orders);
};

const show = async (req: Request, res: Response) => {
    const order = await store.show(req.body.id);
    res.json(order);
};

const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            id: 0,
            status_id: req.body.status_id,
            user_id: req.body.user_id,
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
    } catch (err) {
        errLogger.error(err);
        res.status(400);
        res.json(err);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            id: req.params.id as unknown as number,
            status_id: req.body.status_id,
            user_id: req.body.user_id,
        };
        const updated = await store.update(order);
        res.json(updated);
    } catch (err) {
        errLogger.error(err);
        res.status(400);
        res.json(err);
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await store.delete(req.body.id);
        res.json(deleted);
    } catch (err) {
        errLogger.error(err);
        res.status(400);
        res.json(err);
    }
};

const order_routes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, index);
    app.get('/orders/:id', verifyAuthToken, show);
    app.post('/orders', verifyAuthToken, create);
    app.put('/orders/:id', verifyAuthToken, update);
    app.delete('/orders/:id', verifyAuthToken, destroy);
};

export default order_routes;
