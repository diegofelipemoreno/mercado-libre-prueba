const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/getCategoryController.js'); 

router.get('/:id', categoryController.getCategoryData);

module.exports = router;