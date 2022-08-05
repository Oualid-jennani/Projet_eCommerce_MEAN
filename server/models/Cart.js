const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Order',
        required : false
    },   
})

module.exports = mongoose.model('Cart',cartSchema)