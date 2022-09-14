import { Pool } from 'pg';
import config from './config';

let db: Pool;
if (config.env === 'dev') {
    db = new Pool({
        host: config.host_Dev,
        database: config.db_Dev,
        user: config.user_Dev,
        password: config.password_Dev,
    });
} else if (config.env == 'test') {
    db = new Pool({
        host: config.host_Test,
        database: config.db_Test,
        user: config.user_Test,
        password: config.password_Test,
    });
} else if (config.env == 'prod') {
    db = new Pool({
        host: config.host_Prod,
        database: config.db_Prod,
        user: config.user_Prod,
        password: config.password_Prod,
    });
} else {
    db = new Pool({
        host: config.host_Dev,
        database: config.db_Dev,
        user: config.user_Dev,
        password: config.password_Dev,
    });
}

export default db;
