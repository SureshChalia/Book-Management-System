import React, { useState, useEffect } from "react";
import { getCategories } from "../../Services/Operations/categoryAPI";
import { updateBook, getBookById } from "../../Services/Operations/bookAPI";
const UpdateBooks = ({ bookId }) => {
    const token = localStorage.getItem("token");
    const [categories, setCategories] = useState([]);
    const [book, setBook] = useState({
        bookName: "",
        price: "",
        category: "",
        description: "",
        image: ""
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchBookDetails = async () => {
            try {
                const data = await getBookById(bookId, token);
                setBook(data.data[0]);
            } catch (error) {
                console.error("Error fetching book details: ", error);
            }
        };

        fetchCategories();
        fetchBookDetails();
    }, [bookId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setBook((prevBook) => ({
            ...prevBook,
            image: imageFile,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("bookName", book.bookName);
            formData.append("price", book.price);
            formData.append("category", book.category);
            formData.append("description", book.description);

            if (book.image) {
                formData.append("image", book.image);
            }

            const response = await updateBook(bookId, formData, token);

            console.log("Book updated successfully:", response);
        } catch (error) {
            console.error("Error updating book: ", error);
        }
    };

    return (
        <div className="bg-gray-900">
            <div className="bg-gray-600 p-4 rounded shadow-md mx-auto max-w-7xl w-11/12">
                <h2 className="text-2xl font-bold text-white mb-6 text-left">
                    Update Book
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="bookName"
                            className="block text-sm font-medium text-white"
                        >
                            Book Name
                        </label>
                        <input
                            type="text"
                            name="bookName"
                            id="bookName"
                            value={book.bookName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter book name"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium text-white"
                        >
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={book.price}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter price"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium text-white"
                        >
                            Category
                        </label>
                        <select
                            name="category"
                            id="category"
                            value={book.category}
                            onChange={handleChange}
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
                            htmlFor="description"
                            className="block text-sm font-medium text-white"
                        >
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            value={book.description}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter description"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="image"
                            className="block text-sm font-medium text-white"
                        >
                            Book Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            onChange={handleImageChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            accept="image/*"
                        />
                    </div>


                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Update Book
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateBooks;
