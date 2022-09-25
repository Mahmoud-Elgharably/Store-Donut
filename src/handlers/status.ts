import express, { Request, Response } from 'express';
import { Status, StatusStore } from '../models/status';
import errLogger from '../utilities/errLogger';

const store = new StatusStore();

const index = async (_req: Request, res: Response) => {
    try {
        const statuses = await store.index();
        res.json(statuses);
    } catch (err) {
        errLogger.error(err);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const status = await store.show(req.body.id);
        res.json(status);
    } catch (err) {
        errLogger.error(err);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const status: Status = {
            id: 0,
            name: req.body.name,
        };
        const newStatus = await store.create(status);
        res.json(newStatus);
    } catch (err) {
        errLogger.error(err);
        res.status(400);
        res.json(err);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const status: Status = {
            id: req.params.id as unknown as number,
            name: req.body.name,
        };
        const updated = await store.update(status);
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

const status_routes = (app: express.Application) => {
    app.get('/statuses', index);
    app.get('/statuses/:id', show);
    app.post('/statuses', create);
    app.put('/statuses/:id', update);
    app.delete('/statuses/:id', destroy);
};

export default status_routes;
