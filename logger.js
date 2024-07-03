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
        },
        debug: {
            type: 'file',
            filename: `${__dirname}/logs/${process.env.INS_NAME || 'default'}-debug`,
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
        },
        debug: {
            appenders: ['debug'],
            level: 'debug'
        }
    }
});

const defaultLogger = log4js.getLogger('default');
const errorLogger = log4js.getLogger('error');
const debugLogger = log4js.getLogger('debug');

module.exports = {
    trace() {
        return defaultLogger.trace.call(defaultLogger, ...arguments)
    },
    debug() {
        debugLogger.debug.call(debugLogger, ...arguments)
        return defaultLogger.debug.call(defaultLogger, ...arguments)
    },
    info() {
        return defaultLogger.info.call(defaultLogger, ...arguments)
    },
    warn() {
        errorLogger.warn.call(errorLogger, ...arguments)
        return defaultLogger.warn.call(defaultLogger, ...arguments)
    },
    error() {
        errorLogger.error.call(errorLogger, ...arguments)
        return defaultLogger.error.call(defaultLogger, ...arguments)
    },
    fatal() {
        errorLogger.fatal.call(errorLogger, ...arguments)
        return defaultLogger.fatal.call(defaultLogger, ...arguments)
    }
}
