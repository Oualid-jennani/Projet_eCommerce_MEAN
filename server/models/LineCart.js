const mongoose = require('mongoose');

const lineOrderSchema = mongoose.Schema({
    
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required : false
    },

    quantity: {
        type: Number,
        required : true
    },

    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Order',
        required : false
    },   
})

module.exports = mongoose.model('LineOrder',lineOrderSchema)