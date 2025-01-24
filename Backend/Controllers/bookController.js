const Book = require("../Models/bookModel");
const path = require('path');
const qs = require('qs'); 
const fs = require('fs');

exports.addBook = async (req, res) => {
    try {
        const authorId = req.user.id;
        const parsedBody = qs.parse(req.body);
        const books = Object.values(parsedBody.books || {});

        console.log("Parsed Books Data:", books);
        const bookImages = Array.isArray(req.files?.bookImage)
            ? req.files.bookImage
            : req.files?.bookImage
            ? [req.files.bookImage]
            : [];

        if (!Array.isArray(books) || books.length === 0) {
            return res.status(400).json({ message: 'Books data is required.' });
        }
        if (!bookImages.length || bookImages.length !== books.length) {
            return res.status(400).json({
                message: `Please upload images for all books. Received ${bookImages.length} images for ${books.length} books.`,
            });
        }

        const imagePath = path.join(__dirname, '../images');
        const savedBooks = [];

        for (let i = 0; i < books.length; i++) {
            const { bookName, price, category, description } = books[i];
            const imageFile = bookImages[i];

            if (!bookName || !price || !category || !description) {
                return res.status(400).json({ message: 'All fields are required for each book.' });
            }

            const fileName = `${Date.now()}_${imageFile.name}`;
            const fullPath = path.join(imagePath, fileName);

            try {
                await imageFile.mv(fullPath);
            } catch (fileError) {
                console.error('Error saving file:', fileError);
                return res.status(500).json({ message: 'Error saving book image.' });
            }

            const savedBook = await Book.create({
                bookName,
                price,
                category,
                description,
                author: authorId,
                image: fileName,
            });

            savedBooks.push(savedBook);
        }

        res.status(201).json({
            message: 'Books added successfully',
            data: savedBooks,
        });
    } catch (error) {
        console.error('Error adding books:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};




exports.getAllBooksOfAuthor = async (req, res) => {
    try {
        const authorId = req.user.id;
        const books = await Book.find({ author: authorId }).populate('category');
        res.status(200).json({ success: true, message: 'All book finded with author id', data: books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch books with author id' });
    }
};

exports.searchBookOfAuthor = async (req, res) => {
    try {
        const authorId = req.user.id;
        const { bookName } = req.query;

        const books = await Book.find({ bookName: new RegExp(bookName, 'i'), author: authorId }).populate('category');

        res.status(200).json({
            success: true,
            message: books.length > 0 ? 'Books found' : 'No books found with the given criteria',
            data: books
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to search books',
            error: error.message
        });
    }
};

exports.getBooksWithCategory = async (req, res) => {
    try {
        const { categoryId } = req.query;
        const books = await Book.find({ category: categoryId });
        res.status(200).json({ success: true, message: 'All book finded with category id', data: books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch books with category id' });
    }
};

exports.getBooksWithId = async (req, res) => {
    try {
        const authorId = req.user.id;
        const { bookId } = req.query;
        const books = await Book.find({ _id: bookId, author: authorId });
        res.status(200).json({ success: true, message: 'Book finded with book id', data: books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch books with book id' });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const authorId = req.user.id;
        const { bookId } = req.query;
        const deletedBook = await Book.findByIdAndDelete({ author: authorId, _id: bookId });
        if (!deletedBook) {
            return res.status(404).json({ success: false, message: 'book not found' });
        }
        res.status(200).json({ success: true, message: 'Book deleted successfully', data: deletedBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete book' });
    }
};

// exports.updateBook = async (req, res) => {
//     try {
//         const { bookId } = req.query;
//         const authorId = req.user.id;
//         const { bookName, price, category, description } = req.body;

//         const book = await Book.findOne({ _id: bookId, author: authorId });

//         if (!book) {
//             return res.status(404).json({ message: "Book not found" });
//         }

//         book.bookName = bookName || book.bookName;
//         book.price = price || book.price;
//         book.category = category || book.category;
//         book.description = description || book.description;

//         await book.save();

//         res.status(200).json({
//             message: "Book updated successfully",
//             data: book,
//         });
//     } catch (error) {
//         console.error("Error updating book:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };


exports.updateBook = async (req, res) => {
    try {
        const { bookId } = req.query;
        const authorId = req.user.id;
        const { bookName, price, category, description } = req.body;

        const book = await Book.findOne({ _id: bookId, author: authorId });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        book.bookName = bookName || book.bookName;
        book.price = price || book.price;
        book.category = category || book.category;
        book.description = description || book.description;

        if (req.files?.image) {
            const imageFile = req.files.image;

            if (book.image) {
                const oldImagePath = path.join(__dirname, '../images', path.basename(book.image));
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Error deleting old image:', err);
                    }
                });
            }

            const fileName = `${Date.now()}_${imageFile.name}`;
            const fullPath = path.join(__dirname, '../images', fileName);

            await imageFile.mv(fullPath);
            book.image = fileName; 
        }

        await book.save();

        res.status(200).json({
            message: "Book updated successfully",
            data: book,
        });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};