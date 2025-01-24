const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/bookController');
const {auth} = require('../Middlewares/auth')


router.post('/add-book',auth, bookController.addBook);
router.get('/allbook-of-author',auth, bookController.getAllBooksOfAuthor);
router.get('/get-book',auth, bookController.getBooksWithId);
router.get('/search-book',auth, bookController.searchBookOfAuthor);
router.get('book-of-category', auth, bookController.getBooksWithCategory);
router.delete('/delete-book', auth, bookController.deleteBook);
router.put('/update-book', auth, bookController.updateBook);


module.exports = router;