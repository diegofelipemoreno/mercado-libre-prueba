const express = require('express');

const config = require('./config');
const routes = require('./routes');
const corsConfig = require('./cors');

const app = express();

app.use(corsConfig);
app.listen(config.port, () => {
  console.log(`Mercado Libre API listening on port ${config.port}!`)
});

app.use('/', routes);

