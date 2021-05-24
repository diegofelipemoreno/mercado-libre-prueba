const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController.js'); 
const getItemController = require('../controllers/getItemController.js'); 
const getItemTextController = require('../controllers/getItemTextController'); 

router.get('/', (req, res) => res.redirect('/api/items'));
router.get('/items', searchController.search);
router.get('/items/:id', getItemController.getItem);
router.get('/items/:id/description', getItemTextController.getItem);

module.exports = router;