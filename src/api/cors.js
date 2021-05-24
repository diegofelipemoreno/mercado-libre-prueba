const cors = require('cors');
const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({path: path.join(`.env.${NODE_ENV}`)});

const whiteList = [process.env.APP_DOMAIN];
const corsOptions = {
  origin: (origin, callback) => {
    const originIsWhitelisted = whiteList.indexOf(origin) !== -1;

    callback(null, originIsWhitelisted);
  },
  credentials: true
};

module.exports = cors(corsOptions);