const User = require("../Models/User")

exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await User.find({role:"Author"});
        res.status(200).json({ success: true, message: 'All authores fetched successfully', data: authors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch book authors' });
    }
};