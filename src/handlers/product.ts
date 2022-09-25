import express, { Request, Response } from 'express';
import verifyAuthToken from '../middlewares/authorization';
import { Product, ProductStore } from '../models/product';
import errLogger from '../utilities/errLogger';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index();
        res.json(products);
    } catch (err) {
        errLogger.error(err);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const product = await store.show(req.body.id);
        res.json(product);
    } catch (err) {
        errLogger.error(err);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            id: 0,
            name: req.body.name,
            price: req.body.price,
            category_id: req.body.category_id,
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    } catch (err) {
        errLogger.error(err);
        res.status(400);
        res.json(err);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            id: req.params.id as unknown as number,
            name: req.body.name,
            price: req.body.price,
            category_id: req.body.category_id,
        };
        const updated = await store.update(product);
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

const product_routes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
    app.put('/products/:id', verifyAuthToken, update);
    app.delete('/products/:id', verifyAuthToken, destroy);
};

export default product_routes;
