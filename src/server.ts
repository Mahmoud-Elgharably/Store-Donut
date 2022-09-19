import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config';
import routes from './routes';
//import _ from 'lodash';
import category_routes from './handlers/category';
import order_routes from './handlers/order';
import product_routes from './handlers/product';
import status_routes from './handlers/status';
import user_routes from './handlers/user';
import dashboardRoutes from './handlers/dashboard';

const app: express.Application = express();

const corsOptions = {
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response): void {
    res.send('This is main route');
});

app.get('/test-cors', cors(corsOptions), function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled with a middle ware' });
    next();
});

category_routes(app);
order_routes(app);
product_routes(app);
status_routes(app);
user_routes(app);
dashboardRoutes(app);

// set endpoint
app.use('/api', routes);

app.listen(config.port, (): void => {
    console.log(config.srvrStr + config.fullUrl + config.port);
    //console.log(_.add(3, 5));
});

export default app;
