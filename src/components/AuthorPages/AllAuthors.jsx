import React, { useEffect, useState } from 'react';
import { allAuthors } from '../../Services/Operations/authorAPI';


const author = () => {
  const token = localStorage.getItem('token');
  const [authors, setauthors] = useState([]);


  useEffect(() => {
    const fetchauthors = async () => {
      try {
        const data = await allAuthors(token);
        console.log("authors", data);
        setauthors(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchauthors();
  }, []);


  return (
    <div className='bg-gray-900'>
      <div className="min-h-screen h-full p-6 max-w-7xl w-11/12">
      <div className="mt-8 max-w-4xl mx-auto bg-gray-600 text-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-white mb-4">All Authors</h2>
        {authors.length === 0 ? (
          <p className="text-gray-600">No authors found.</p>
        ) : (
          <table className="min-w-full bg-gra-600">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {authors.length > 0 && authors.map((author) => (
                <tr key={author._id}>
                  <td className="py-2 px-4 border-b">{author.name}</td>
                  <td className="py-2 px-4 border-b">{author.email}</td>
                  <td className="py-2 px-4 border-b">{author?.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </div>
  );
};

export default author;
