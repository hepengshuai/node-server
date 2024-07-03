const log4js = require('log4js');

log4js.configure({
    appenders: {
        consoleOut: {
            type: 'console',
            layout: {
                'type': 'colored'
            }
        },
        default: {
            type: 'file',
            filename: `${__dirname}/logs/${process.env.INS_NAME || 'default'}-logger`,
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        error: {
            type: 'file',
            filename: `${__dirname}/logs/${process.env.INS_NAME || 'default'}-error`,
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: {
            appenders: ['consoleOut', 'default'],
            level: 'all'
        },
        error: {
            appenders: ['consoleOut', 'error'],
            level: 'warn'
        }
    }
});

const defaultLogger = log4js.getLogger('default');
const errorLogger = log4js.getLogger('error');

module.exports = {
    trace() {
        return defaultLogger.trace.call(defaultLogger, ...arguments)
    },
    debug() {
        return defaultLogger.debug.call(defaultLogger, ...arguments)
    },
    info() {
        return defaultLogger.info.call(defaultLogger, ...arguments)
    },
    warn() {
        return errorLogger.warn.call(errorLogger, ...arguments)
    },
    error() {
        return errorLogger.error.call(errorLogger, ...arguments)
    },
    fatal() {
        return errorLogger.fatal.call(errorLogger, ...arguments)
    }
}
