const express = require('express');
const router = express.Router();
const CategoryController = require('../Controllers/CategoryController');
const {auth} = require('../Middlewares/auth')

router.post('/add-category', auth,CategoryController.addCategory);
router.get('/get-categories', CategoryController.getAllCategories);
router.delete('/delete-category', auth, CategoryController.deleteCategory);
router.put('/update-category', auth, CategoryController.updateCategory);

module.exports = router;