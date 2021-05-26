const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/getCategoryController.js'); 

router.get('/:id', categoriesController.getCategories);

module.exports = router;