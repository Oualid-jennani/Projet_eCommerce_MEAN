const Category = require('../models/Category');

// Get All
exports.getAll = async (req, res, next) => {
    const categories = await Category.find();

    if (categories.length === 0) {
        return res.status(404).json({
            message: 'No Categories'
        })
    } else return res.status(200).json({
        categories: categories
    })
}

// Create new
exports.add = async (req, res, next) => {
    const category = new Category({
        name: req.body.name,
    });

    const result = await category.save();
    
    if (result) return res.status(200).json({
        message: 'Success'
    });
    else return res.status(404).json({
        message: 'Error'
    });
}

// Get by Id
exports.getById = async (req, res, next) => {
    const category = await Category.findOne({ _id: req.params.id })
    
    if (category) return res.status(200).send(category); 
    else return res.status(404).json({
        message: 'Not Found'
    });
}

// Edit by Id
exports.update = async (req, res, next) => {
    let category = new Category(); 
    category = req.body;

    const result = await Category.findOneAndUpdate({ _id: req.params.id }, {
        $set: category
    });

    if (result) return res.status(200).json({
        message: 'Category Updated'
    });
    else return res.status(404).json({
        message: 'Error Db Update'
    });
}

// Delete by id
exports.delete = async (req, res, next) => {
    console.log(req.params.id);
    const result = await Category.findOneAndDelete({ _id: req.params.id });
    
    if (result) return res.status(200).json({
        message: 'Category Deleted'
    });
    else return res.status(404).json({
        message: 'Error Db Delete'
    });
};

