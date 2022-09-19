import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import errLogger from '../utilities/errLogger';
import jwt from 'jsonwebtoken';
import config from '../config';
import verifyAuthToken from '../middlewares/authorization';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
    const users = await store.index();
    res.json(users);
};

const show = async (req: Request, res: Response) => {
    const user = await store.show(req.body.id);
    res.json(user);
};

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            id: 0,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_name: req.body.user_name,
            password: req.body.password,
        };
        const newUser = await store.create(user);
        const token = jwt.sign({ user: newUser }, config.tokenSecret as unknown as string);
        res.json(token);
    } catch (err) {
        errLogger.error(err);
        res.status(400);
        res.json(err);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const user: User = {
            id: req.params.id as unknown as number,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_name: req.body.user_name,
            password: req.body.password,
        };
        const updated = await store.update(user);
        const token = jwt.sign({ user: updated }, config.tokenSecret as unknown as string);
        res.json(token);
    } catch (err) {
        errLogger.error(err);
        res.status(400);
        res.json(err);
    }
};

const authenticate = async (req: Request, res: Response) => {
    try {
        const user_name = req.body.user_name;
        const password = req.body.password;
        const result = await store.authenticate(user_name, password);
        if (result === null) {
            throw new Error(config.msgInvldUsr);
        } else {
            res.json(result);
        }
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

const user_routes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', create);
    app.put('/users/:id', verifyAuthToken, update);
    app.post('/users/authenticate', authenticate);
    app.delete('/users/:id', verifyAuthToken, destroy);
};

export default user_routes;
