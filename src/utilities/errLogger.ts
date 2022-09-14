import SimpleLogger from 'simple-node-logger';

const opts = {
    logFilePath: 'errors.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss',
};
const log = SimpleLogger.createSimpleLogger(opts);

export default log;
