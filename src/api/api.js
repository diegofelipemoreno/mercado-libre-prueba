const CONSTANTS = require('./constants.js');
const express = require('express');
const indexRouter = require('./routers/index.js');
const itemsRouter = require('./routers/items.js');
const categoriesRouter = require('./routers/categories.js');
const corsConfig = require('./cors.js');

const app = express();

app.use(corsConfig);
app.listen(CONSTANTS.API.PORT, () => {
  console.log(`Mercado Libre API listening on port ${CONSTANTS.API.PORT}!`)
});
app.use('/', indexRouter);
app.use('/api', itemsRouter);
app.use('/categories', categoriesRouter);