import React, { useEffect, useState } from 'react';
import { getAllBooks, adminSearchBook } from '../../Services/Operations/bookAPI';

const AllBooksPage = () => {
    const token = localStorage.getItem('token');
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const BASE_URL = import.meta.env.VITE_APP_BASE_URL.replace(/\/api$/, '/');



    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getAllBooks(token);
                console.log(data)
                setBooks(data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBooks();
    }, []);

    const handleSearch = async () => {
        try {
            const data = await adminSearchBook(token, searchQuery);
            setBooks(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-7xl w-11/12 mx-auto bg-gray-600 rounded-lg shadow p-6 mb-4">
                <h1 className="text-2xl font-bold text-white mb-4">Search Books By Name</h1>
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter book name"
                        className="flex-grow p-2 border rounded-md"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="mt-8 max-w-7xl w-11/12 mx-auto bg-gray-600 rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-white mb-4">All Books</h2>
                {books.length === 0 ? (
                    <p className="text-white">No books found.</p>
                ) : (
                    <table className="min-w-full bg-gray-600 text-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-left">Image</th>
                                <th className="py-2 px-4 border-b text-left">Name</th>
                                <th className="py-2 px-4 border-b text-left">Price</th>
                                <th className="py-2 px-4 border-b text-left">Category</th>
                                <th className="py-2 px-4 border-b text-left">Author</th>
                                <th className="py-2 px-4 border-b text-left">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book._id}>
                                    <td className="h-14 w-14 py-2 px-4 border-b">
                                        <img className="h-14 w-14 rounded-lg object-contain" src={`${BASE_URL}${book.image}`} alt="book-img" />
                                    </td>
                                    <td className="py-2 px-4 border-b">{book.bookName}</td>
                                    <td className="py-2 px-4 border-b">{book.price}</td>
                                    <td className="py-2 px-4 border-b">{book.category?.categoryName}</td>
                                    <td className="py-2 px-4 border-b">{book.author?.name}</td>
                                    <td className="py-2 px-4 border-b">{book.description}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AllBooksPage;
