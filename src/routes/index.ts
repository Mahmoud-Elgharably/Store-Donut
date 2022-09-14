import express from 'express';
//import images from './api/images';
//import fetch from './api/fetch';

const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response): void => {
    res.send('main api route');
});

//routes.use('/images', images);
//routes.use('/fetch', fetch);

export default routes;
