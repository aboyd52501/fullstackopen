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
