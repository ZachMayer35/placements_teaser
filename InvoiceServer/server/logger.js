const bunyan = require('bunyan');
const PrettyStream = require('bunyan-pretty-colors');
let logger;
if (process.env.NODE_ENV === 'development') {
  let prettyStdOut = new PrettyStream({ mode: 'short' });
  try {
    prettyStdOut.pipe(process.stdout);
  } catch (ex) {
    console.log(ex);
  }
  logger = bunyan.createLogger({
    name: 'InvoiceServer',
    serializers: bunyan.stdSerializers,
    streams: [{
      level: process.env.NPM_CONFIG_LOGLEVEL || 'debug',
      stream: prettyStdOut
    }]
  });
} else {
  logger = bunyan.createLogger({
    name: 'InvoiceServer',
    serializers: bunyan.stdSerializers,
    level: process.env.NPM_CONFIG_LOGLEVEL || 'info'
  });
}

module.exports = logger;
