import { Request, Response } from 'express';
import config from '../config';
import jwt from 'jsonwebtoken';
import errLogger from '../utilities/errLogger';

// eslint-disable-next-line @typescript-eslint/ban-types
const verifyAuthToken = (req: Request, res: Response, next: Function) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const tokenType = (authorizationHeader as unknown as string).split(' ')[0];
        if (tokenType === 'Bearer') {
            const token = (authorizationHeader as unknown as string).split(' ')[1];
            jwt.verify(token, config.tokenSecret as unknown as string);
        } else {
            throw new Error(config.msgUnkwnTkn);
        }
        next();
    } catch (err) {
        errLogger.error(err);
        res.status(401);
        res.json(config.msgInvldTkn + err);
        return;
    }
};

export default verifyAuthToken;
