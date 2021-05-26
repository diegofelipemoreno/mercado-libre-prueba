const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController.js'); 
const getItemController = require('../controllers/getItemController.js'); 

router.get('/', (req, res) => res.redirect('/api/items'));
router.get('/items', searchController.search);
router.get('/items/:id', getItemController.getItem);

module.exports = router;