import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Book Management System</h1>
        <p className="text-gray-600 text-center mb-8">
         Login or Register to get started.
        </p>
        <div className="flex justify-center space-x-4">
          <button
          onClick={()=>{navigate("/login")}}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
          <button
          onClick={()=>{navigate("/signup")}}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
