const Product = require('../models/Product');
const fs = require('fs');

// Get All Reservations
exports.getAll = async (req, res, next) => {

    let skip = 0;
    let limit = 6;
    let pages = 1;

    let filter = {};
    if('undefined' !== req.query.category && 'all' !== req.query.category ){
        filter = { category: req.query.category };
    }
    
    let count= await Product.find(filter).count();
    pages = Math.ceil(count/limit);
    if(req.query.page !== undefined) skip = (limit * req.query.page)-limit;

    const products = await Product.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    if (products.length === 0) {
        return res.status(404).json({
            message: 'No Products'
        })
    } else return res.status(200).json({
        products: products,
        totalPages:pages
    })
}

// Get by Id
exports.getById = async (req, res, next) => {
    const product = await Product.findOne({ _id: req.params.id })
    
    if (product) return res.status(200).send(product); 
    else return res.status(404).json({
        message: 'Not Found'
    });
}


// Create new
exports.add = async (req, res, next) => {

    var url = null;
    if(req.file){
        url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }

    for(var i = 0; i < 30 ;i++){
        let product = new Product({
            name: req.body.name,
            images: url,
            price: req.body.price,
            compareAtPrice: req.body.compareAtPrice,
            description: req.body.description,
            category: req.body.category,
            user: req.body.user,
            createdAt: new Date(),
            status:'new',
        });
    
        let result = await product.save();
    }
    
    
    if (result) return res.status(200).json({
        message: 'Success'
    });
    else return res.status(404).json({
        message: 'Error'
    });
}

// Edit by Id
exports.update = async (req, res, next) => {

    let product = new Product(); 
    product = req.body;

    let oldProduct = Product.findOne({_id:req.params.id});
    console.log(oldProduct)
    var path = null;
    if(req.file){
        path = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        product.images = path;
        
        if(oldProduct.images){
            oldPath = `${req.protocol}://${req.get('host')}/images/${oldProduct.images}`;
            console.log(oldPath)
            if (fs.existsSync(oldPath)) {
                fs.unlink(oldPath,err => {
                    if(err) return res.status(400).json({message:err.message});
                });
            }
        }
    }

    const result = await Product.findOneAndUpdate({ _id: req.params.id }, {
        $set: product
    });

    if (result) return res.status(200).json({
        message: 'Product Updated'
    });
    else return res.status(404).json({
        message: 'Error Db Update'
    });
}

// Delete by id
exports.delete = async (req, res, next) => {
    const result = await Product.findOneAndDelete({ _id: req.params.id });
    
    if (result) return res.status(200).json({
        message: 'Product Deleted'
    });
    else return res.status(404).json({
        message: 'Error Db Delete'
    });
};

