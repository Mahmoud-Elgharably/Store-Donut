import express, { Request, Response } from 'express';
import { Category, CategoryStore } from '../models/category';
import errLogger from '../utilities/errLogger';

const store = new CategoryStore();

const index = async (_req: Request, res: Response) => {
    const categories = await store.index();
    res.json(categories);
};

const show = async (req: Request, res: Response) => {
    const category = await store.show(req.body.id);
    res.json(category);
};

const create = async (req: Request, res: Response) => {
    try {
        const category: Category = {
            id: 0,
            name: req.body.name,
        };
        const newCategory = await store.create(category);
        res.json(newCategory);
    } catch (err) {
        errLogger.error(err);
        res.status(400);
        res.json(err);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const category: Category = {
            id: req.params.id as unknown as number,
            name: req.body.name,
        };
        const updated = await store.update(category);
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

const category_routes = (app: express.Application) => {
    app.get('/categories', index);
    app.get('/categories/:id', show);
    app.post('/categories', create);
    app.put('/categories/:id', update);
    app.delete('/categories/:id', destroy);
};

export default category_routes;
