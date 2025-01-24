import React from 'react';
import { Link } from 'react-router-dom';

const UnAuthorizedPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-600">403 - Unauthorized</h1>
            <p className="text-lg text-gray-700 mt-2">
                Sorry, you don’t have permission to access this page.
            </p>
            <Link
                to="/"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Go to Home
            </Link>
        </div>
    );
};

export default UnAuthorizedPage;
