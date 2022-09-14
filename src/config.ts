import dotenv from 'dotenv';

dotenv.config();

const {
    ENV,
    PORT,
    URL,
    DB_DRIVER,
    HOST_DEV,
    DB_DEV,
    USER_DEV,
    PASSWORD_DEV,
    HOST_TEST,
    DB_TEST,
    USER_TEST,
    PASSWORD_TEST,
    HOST_PROD,
    DB_PROD,
    USER_PROD,
    PASSWORD_PROD,
} = process.env;

export default {
    env: ENV,
    port: PORT,
    url: URL,
    fullUrl: URL + ':',
    srvrStr: 'Server started at ',
    dbDriver: DB_DRIVER,
    host_Dev: HOST_DEV,
    db_Dev: DB_DEV,
    user_Dev: USER_DEV,
    password_Dev: PASSWORD_DEV,
    host_Test: HOST_TEST,
    db_Test: DB_TEST,
    user_Test: USER_TEST,
    password_Test: PASSWORD_TEST,
    host_Prod: HOST_PROD,
    db_Prod: DB_PROD,
    user_Prod: USER_PROD,
    password_Prod: PASSWORD_PROD,
};
