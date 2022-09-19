import express, { Request, Response } from 'express';
import verifyAuthToken from '../middlewares/authorization';
import { DashboardQueries } from '../services/dashboard';

const dashboard = new DashboardQueries();

const addProduct = async (req: Request, res: Response) => {
    try {
        const quantity: number = parseInt(req.body.quantity);
        const productId: number = parseInt(req.body.productId);
        const orderId: number = parseInt(req.params.id);
        const added = await dashboard.addProduct(quantity, productId, orderId);
        res.json(added);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const showProducts = async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.params.userID);
        const orderId: number = parseInt(req.params.orderID);
        const result = await dashboard.showProducts(userId, orderId);
        res.json(result);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const getTop5Products = async (_req: Request, res: Response) => {
    try {
        const result = await dashboard.getTop5Products();
        res.json(result);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const getProductsByCat = async (req: Request, res: Response) => {
    try {
        const category: string = req.body.category as unknown as string;
        const result = await dashboard.getProductsByCat(category);
        res.json(result);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const getActOrderByUsr = async (req: Request, res: Response) => {
    try {
        const user_id = parseInt(req.body.user_id as unknown as string);
        const result = await dashboard.getActOrderByUsr(user_id);
        res.json(result);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const getCmpOrdersByUsr = async (req: Request, res: Response) => {
    try {
        const user_id = parseInt(req.body.user_id as unknown as string);
        const result = await dashboard.getCmpOrdersByUsr(user_id);
        res.json(result);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const dashboardRoutes = (app: express.Application) => {
    app.post('/orders/:id/products', verifyAuthToken, addProduct);
    app.get('/users/:userID/orders/:orderID/products', verifyAuthToken, showProducts);
    app.get('/products-top-5', getTop5Products);
    app.get('/products-by-cat', getProductsByCat);
    app.get('/active-order', verifyAuthToken, getActOrderByUsr);
    app.get('/complete-orders', verifyAuthToken, getCmpOrdersByUsr);
};

export default dashboardRoutes;
