const express = require('express');
const router = express.Router();

const {itemController, searchController} = require('./controllers/index'); 
const requestUtil = require('./requestUtil'); 


router.get('/', (req, res) => res.redirect('/api/items'));

router.get('/api/items', async ({query}, res) => {
  const {q} = query;
  const {statusCode, body} = await searchController(requestUtil, q);

  return res.status(statusCode).send(body);
});

router.get('/api/items/:id', async (req, res) => {
  const {params} = req;
  const {id} = params;
  const itemResponse = await itemController(requestUtil, id);
  const {statusCode, body} = itemResponse;
 
  return res.status(statusCode).send(body);
});

module.exports = router;