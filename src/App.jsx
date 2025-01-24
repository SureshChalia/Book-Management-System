import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainDashboard from './components/MainDashboard';
import LoginForm from './components/Auth/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import AllAuthors from './components/AuthorPages/AllAuthors';
import Category from './components/Category/Category';
import SignupForm from './components/Auth/SignUpForm';
import AddBook from './components/AuthorPages/AddBook';
import AllBooks from './components/AuthorPages/AllBooks';
import Homepage from './components/HomePage';
import UnAuthorizedPage from "./components/UnAuthorizedPage"
import AuthorHome from './components/AuthorPages/AuthorHome';
import AdminHome from './components/AdminHome';
import AllBooksPage from './components/Auth/AllBooksPage';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route index path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/unauthorized" element={<UnAuthorizedPage />} />
      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainDashboard />
          </ProtectedRoute>
        }
      >
        {/* Admin-Specific Routes */}
        <Route
          path="admin-home"
          element={
            <ProtectedRoute requiredRoles={['Admin']}>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="book-authors"
          element={
            <ProtectedRoute requiredRoles={['Admin']}>
              <AllAuthors />
            </ProtectedRoute>
          }
        />

        <Route
          path="books"
          element={
            <ProtectedRoute requiredRoles={['Admin']}>
              <AllBooksPage/>
            </ProtectedRoute>
          }
        />

        <Route
          path="book-categories"
          element={
            <ProtectedRoute requiredRoles={['Admin']}>
              <Category />
            </ProtectedRoute>
          }
        />

        {/* Author-Specific Routes */}
        <Route
          path="author-home"
          element={
            <ProtectedRoute requiredRoles={['Author']}>
              <AuthorHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="add-book"
          element={
            <ProtectedRoute requiredRoles={['Author']}>
              <AddBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="all-books"
          element={
            <ProtectedRoute requiredRoles={['Author']}>
              <AllBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="author/book-categories"
          element={
            <ProtectedRoute requiredRoles={['Author']}>
              <Category />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
