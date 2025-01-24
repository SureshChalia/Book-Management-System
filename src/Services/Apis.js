

const BASE_URL = import.meta.env.VITE_APP_BASE_URL


// AUTH ENDPOINTS
export const endpoints = {
    SIGNUP_API: BASE_URL + "/signup",
    LOGIN_API: BASE_URL + "/login",
    ALL_AUTHORS_API: BASE_URL + "/all-authors"
  }


//Category Endpoints
export const categoryEndpoints = {
  ADD_CATEGORY: BASE_URL + "/add-category",
  GET_CATEGORIES: BASE_URL + "/get-categories",
  DELETE_CATEGORY: BASE_URL + "/delete-category",
  UPDATE_CATEGORY: BASE_URL + "/update-category",
}

//author endpoints
export const authorEndpoints = {
  ALL_AUTHORS_API: BASE_URL + "/all-authors"
}

//book endpoints 
export const bookEndpoints = {
  ADD_Book_API : BASE_URL + "/add-book",
  BOOK_OF_AUTHOR_API : BASE_URL + "/allbook-of-author",
  BOOK_OF_CATEGORY_API : BASE_URL + "/book-of-category",
  DELETE_BOOK_API : BASE_URL + "/delete-book",
  UPDATE_BOOK_API: BASE_URL + "/update-book",
  SEARCH_BOOK_API : BASE_URL + "/search-book",
  ADMIN_SEARCH_BOOK_API : BASE_URL + "/book-search",
  GET_BOOK_API : BASE_URL + "/get-book",
  ALL_BOOKS_API: BASE_URL + "/all-books"
}










