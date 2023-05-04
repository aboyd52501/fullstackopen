/*
This code exports a simple logging utility that writes logs to a file when the `NODE_ENV` environment variable is set to `'test'`. The utility has two functions, `info` and `error`, which take a variable number of arguments and write them to the log file or the console. 

The logging utility checks the size of the log file and truncates it if it exceeds a specified size limit. The log file is named `./.testoutput` and is created in the same directory as the module file. 

When the `NODE_ENV` environment variable is not set to `'test'`, the `info` and `error` functions log to the console as usual.
*/
const fs = require('fs');

const TESTING = process.env.NODE_ENV === 'test';
const LOGFILE = './.testoutput';
const LOG_MAX_SIZE = Math.pow(1024,2)*10 // 10MiB 

if (fs.existsSync(LOGFILE)) {
  const stats = fs.statSync(LOGFILE)
  const logLength = stats.size;
  if (logLength > LOG_MAX_SIZE) {
    fs.truncateSync(LOGFILE, LOG_MAX_SIZE);
  }
}

const writeLog = (content) => {
  const dateString = (new Date()).toLocaleString('zh', { timeZoneName: 'shortOffset' });
  fs.writeFileSync(LOGFILE, `${dateString} ${content}`, { flag: 'a' });
}

const info = (...args) => {
  if (!TESTING) console.log(...args);
  else writeLog(`${args.map((x) => x.toString()).join(' ')}\n`);
};

const error = (...args) => {
  if (!TESTING) console.error(...args);
  else writeLog(`E: ${args.map(((x) => x.toString())).join(' ')}\n`);
};

module.exports = {
  info,
  error,
};
