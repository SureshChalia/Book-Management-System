import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    addCategory,
    getCategories,
    deleteCategory,
    updateCategory,
} from '../../Services/Operations/categoryAPI';

const Category = () => {
    const token = localStorage.getItem('token');
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [categories, setCategories] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

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

    const onSubmit = async (data) => {
        try {
            if (isEditMode) {
                // Update category
                await updateCategory(editId, data, token);
                setCategories((prev) =>
                    prev.map((category) =>
                        category.id === editId ? { ...category, ...data } : category
                    )
                );
                setIsEditMode(false);
                setEditId(null);
            } else {
                // Add category
                const newCategory = await addCategory(data, token);

            }
            reset();
        } catch (error) {
            console.error(error);
        }
    };


    const handleEdit = (category) => {
        setIsEditMode(true);
        setEditId(category._id);
        setValue('categoryName', category.categoryName);
        setValue('categoryDesc', category.categoryDesc);
    };


    const handleDelete = async (id) => {
        try {
            await deleteCategory(id, token);
            setCategories((prev) => prev.filter((category) => category._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-4xl mx-auto bg-gray-600 rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold text-white mb-4">
                    {isEditMode ? 'Edit Category' : 'Add Category'}
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label
                            htmlFor="categoryName"
                            className="block text-sm font-medium text-white"
                        >
                            Category Name
                        </label>
                        <input
                            type="text"
                            {...register('categoryName', { required: 'Category name is required' })}
                            id="categoryName"
                            className={`block w-full mt-1 p-2 border rounded-md ${errors.categoryName ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.categoryName && (
                            <span className="text-red-500 text-sm">
                                {errors.categoryName.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="categoryDesc"
                            className="block text-sm font-medium text-white"
                        >
                            Category Description
                        </label>
                        <input
                            type="text"
                            {...register('categoryDesc', { required: 'Description is required' })}
                            id="categoryDesc"
                            className={`block w-full mt-1 p-2 border rounded-md ${errors.categoryDesc ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.categoryDesc && (
                            <span className="text-red-500 text-sm">
                                {errors.categoryDesc.message}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        {isEditMode ? 'Update Category' : 'Add Category'}
                    </button>
                </form>
            </div>

            <div className="mt-8 max-w-4xl mx-auto bg-gray-600 rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-white mb-4">Categories</h2>
                {categories.length === 0 ? (
                    <p className="text-white">No categories found.</p>
                ) : (
                    <table className="min-w-full bg-gray-600 text-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-left">Name</th>
                                <th className="py-2 px-4 border-b text-left">Description</th>
                                <th className="py-2 px-4 border-b text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length > 0 && categories.map((category) => (
                                <tr key={category._id}>
                                    <td className="py-2 px-4 border-b">{category.categoryName}</td>
                                    <td className="py-2 px-4 border-b">{category.categoryDesc}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => handleEdit(category)}
                                            className="text-blue-600 hover:underline mr-4"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category._id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Category;
