import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config';
import routes from './routes';
import _ from 'lodash';

const app: express.Application = express();

const corsOptions = {
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response): void {
    res.send('Hello World!!');
});

app.get('/test-cors', cors(corsOptions), function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled with a middle ware' });
});

// set endpoint
app.use('/api', routes);

app.listen(config.port, (): void => {
    console.log(config.srvrStr + config.fullUrl + config.port);
    //console.log(_.add(3, 5));
});

export default app;
