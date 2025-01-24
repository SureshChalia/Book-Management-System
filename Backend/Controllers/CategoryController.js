const Category = require('../Models/categoryModel');



exports.addCategory = async (req, res) => {
    try {

        const { categoryName, categoryDesc } = req.body;
        if (!categoryName && !categoryDesc) {
            res.status(204).json({ success: false, message: 'Book category name and category description are required' });

        }
        const category = new Category({
            categoryName,
            categoryDesc,
        });
        await category.save();
        res.status(201).json({ success: true, message: 'Book category added successfully', data: category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to add book category' });
    }
};


exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ success: true, message: 'All book categories fetched successfully', data: categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch book categories' });
    }
};


exports.deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.query;
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.status(200).json({ success: true, message: 'Category deleted successfully', data: deletedCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete category' });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.query;
        let category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        const { categoryName, categoryDesc } = req.body;
        category.categoryName = categoryName;
        category.categoryDesc = categoryDesc;
        await category.save();
        res.status(200).json({ success: true, message: 'Category updated successfully', data: category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to update category' });
    }
};


