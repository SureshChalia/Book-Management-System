import React, { useState, useEffect } from "react";
import { getCategories } from '../../Services/Operations/categoryAPI';
import { addBook } from "../../Services/Operations/bookAPI";

const AddBooks = () => {
    const token = localStorage.getItem('token');
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([
        {
            bookName: "",
            price: "",
            category: "",
            description: "",
            image: null,
        },
    ]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    const handleBookChange = (index, e) => {
        const { name, value, files } = e.target;
        const updatedBooks = [...books];
        if (name === "image") {
            updatedBooks[index][name] = files[0];
        } else {
            updatedBooks[index][name] = value;
        }
        setBooks(updatedBooks);
    };

    const handleAddBook = () => {
        setBooks([
            ...books,
            {
                bookName: "",
                price: "",
                category: "",
                description: "",
                image: null
            },
        ]);
    };

    const handleRemoveBook = (index) => {
        const updatedBooks = books.filter((_, i) => i !== index);
        setBooks(updatedBooks);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            books.forEach((book, index) => {
                formData.append(`books[${index}][bookName]`, book.bookName);
                formData.append(`books[${index}][price]`, book.price);
                formData.append(`books[${index}][category]`, book.category);
                formData.append(`books[${index}][description]`, book.description);
                if (book.image) {
                    formData.append(`bookImage`, book.image);
                }
            });

            const response = await addBook(formData, token);
            setBooks([
                {
                    bookName: "",
                    price: "",
                    category: "",
                    description: "",
                    image: null,
                },
            ]);

        } catch (error) {
            console.error("Error submitting books: ", error);
        }
    };


    return (
        <div className=" bg-gray-900">
            <div className="bg-gray-600 p-4 rounded shadow-md  mx-auto max-w-7xl w-11/12">
                <h2 className="text-2xl font-bold text-white mb-6 text-left">
                    Add Books
                </h2>
                <form onSubmit={handleSubmit} className="space-y-2">
                    {books.map((book, index) => (
                        <div key={index} className="border p-4 rounded-md space-y-2">
                            <div>
                                <label
                                    htmlFor={`bookName-${index}`}
                                    className="block text-sm font-medium text-white"
                                >
                                    Book Name
                                </label>
                                <input
                                    type="text"
                                    name="bookName"
                                    id={`bookName-${index}`}
                                    value={book.bookName}
                                    onChange={(e) => handleBookChange(index, e)}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter book name"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor={`price-${index}`}
                                    className="block text-sm font-medium text-white"
                                >
                                    Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    id={`price-${index}`}
                                    value={book.price}
                                    onChange={(e) => handleBookChange(index, e)}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter price"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor={`category-${index}`}
                                    className="block text-sm font-medium text-white"
                                >
                                    Category
                                </label>
                                <select
                                    name="category"
                                    id={`category-${index}`}
                                    value={book.category}
                                    onChange={(e) => handleBookChange(index, e)}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Select category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor={`description-${index}`}
                                    className="block text-sm font-medium text-white"
                                >
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    id={`description-${index}`}
                                    value={book.description}
                                    onChange={(e) => handleBookChange(index, e)}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter description"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor={`image-${index}`}
                                    className="block text-sm font-medium text-white"
                                >
                                    Book Image
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    id={`image-${index}`}
                                    onChange={(e) => handleBookChange(index, e)}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    accept="image/*"
                                    required
                                />
                            </div>

                            {books.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveBook(index)}
                                    className="w-full py-2 px-4 bg-red-600 text-white rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    Remove Book
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAddBook}
                        className="w-full py-2 px-4 bg-green-600 text-white rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Add Another Book
                    </button>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Add Books
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBooks;
