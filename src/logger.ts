const debug = require('debug');
enum logType {
  trace = 'trace',
  debug = 'debug',
  info = 'info',
  warn = 'warn',
  error = 'error',
  fatal = 'fatal',
}

function tracer(name: string, type: logType) {
  const logger = debug(`${name}:${type}`);
  return logger;
}

export function getLogger(name: string) {
  return () => ({
    trace: tracer(name, logType.trace),
    debug: tracer(name, logType.debug),
    info: tracer(name, logType.info),
    warn: tracer(name, logType.warn),
    error: tracer(name, logType.error),
    fatal: tracer(name, logType.fatal),
  });
}

export function configure() {}
