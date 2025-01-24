import { toast } from "react-hot-toast";
import { apiConnector } from "../ApiConnector";
import { bookEndpoints } from "../Apis";

const { ADD_Book_API, BOOK_OF_AUTHOR_API, BOOK_OF_CATEGORY_API, DELETE_BOOK_API, UPDATE_BOOK_API, SEARCH_BOOK_API, GET_BOOK_API, ALL_BOOKS_API , ADMIN_SEARCH_BOOK_API} = bookEndpoints;

export const addBook = async (books, token) => {
    try {
        const response = await apiConnector("POST", ADD_Book_API, books, {
            Authorization: `Bearer ${token}`,
        });
        toast.success("book added successfully");
        return response.data;
    } catch (error) {
        toast.error("Failed to add book");
        throw error;
    }
};

export const getBookOfAuthor = async (token) => {
    try {
        const response = await apiConnector("GET", BOOK_OF_AUTHOR_API, null, {
            Authorization: `Bearer ${token}`,
        });
        return response.data;
    } catch (error) {
        toast.error("Failed to fetch all books of author");
        throw error;
    }
};

export const getAllBooks = async (token) => {
    try {
        const response = await apiConnector("GET", ALL_BOOKS_API, null, {
            Authorization: `Bearer ${token}`,
        });
        return response.data;
    } catch (error) {
        toast.error("Failed to fetch all books");
        throw error;
    }
};

export const searchBook = async (token, bookName) => {
    try {
        const response = await apiConnector("GET", SEARCH_BOOK_API, null, {
            Authorization: `Bearer ${token}`,
        }, { bookName });
        return response.data;
    } catch (error) {
        toast.error("Failed to search a book ");
        throw error;
    }
};

export const adminSearchBook = async (token, bookName) => {
    try {
        const response = await apiConnector("GET", ADMIN_SEARCH_BOOK_API, null, {
            Authorization: `Bearer ${token}`,
        }, { bookName });
        return response.data;
    } catch (error) {
        toast.error("Failed to search a book ");
        throw error;
    }
};


export const getBookOfCategory = async (categoryId, token) => {
    try {
        await apiConnector("GET", BOOK_OF_CATEGORY_API, null, {
            Authorization: `Bearer ${token}`,
        }, { categoryId });
        toast.success("Book finded successfully with category");
    } catch (error) {
        toast.error("Failed to find book with category");
        throw error;
    }
};

export const getBookById = async (bookId, token) => {
    try {
        const response = await apiConnector("GET", GET_BOOK_API, null, {
            Authorization: `Bearer ${token}`,
        }, { bookId });
        return response.data;
    } catch (error) {
        toast.error("Failed to find book with book id");
        throw error;
    }
};

export const updateBook = async (bookId, bookData, token) => {
    try {
        const response = await apiConnector("PUT", UPDATE_BOOK_API, bookData, {
            Authorization: `Bearer ${token}`,
        }, { bookId });
        toast.success("Book  updated successfully");
        return response.data;
    } catch (error) {
        toast.error("Failed to update Book ");
        throw error;
    }
};

export const deleteBook = async (bookId, token) => {
    try {
        const response = await apiConnector("DELETE", DELETE_BOOK_API, null, {
            Authorization: `Bearer ${token}`,
        }, { bookId });
        toast.success("Book  deleted successfully");
        return response.data;
    } catch (error) {
        toast.error("Failed to delete Book ");
        throw error;
    }
};
