const Order = require('../models/Order');

// Get All Reservations
exports.getAll = async (req, res, next) => {
    const orders = await Order.find();

    if (orders.length === 0) {
        return res.status(404).json({
            message: 'No Categories'
        })
    } else return res.status(200).json({
        orders: orders
    })
}

// Create new
exports.new = async (req, res, next) => {
    const order = new Order({
        customerName: req.body.customerName,
        cin: req.body.cin,
        phoneNumber: req.body.phoneNumber,
        note: req.body.note,
        city: req.body.city,
        address: req.body.address,
        customer: req.body.customer,
        createdAt: new Date(),
        status:'new',
    });

    const result = await order.save();
    
    if (result) return res.status(200).json({
        message: 'Success'
    });
    else return res.status(404).json({
        message: 'Error'
    });
}

// Get by Id
exports.getById = async (req, res, next) => {
    const order = await Order.findOne({ _id: req.params.id })
    
    if (order) return res.status(200).send(order); 
    else return res.status(404).json({
        message: 'Not Found'
    });
}

// Delete by id
exports.delete = async (req, res, next) => {
    const result = await Order.findOneAndDelete({ _id: req.params.id });
    
    if (result) return res.status(200).json({
        message: 'Order Deleted'
    });
    else return res.status(404).json({
        message: 'Order Db Delete'
    });
};

