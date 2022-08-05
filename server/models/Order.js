const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    customerName: {
        type : String,
        required : true
    },

    cin: {
        type : String,
        required : true
    },

    phoneNumber: {
        type : String,
        required : true
    },

    note: {
        type : String,
        required : true
    },

    status : {
        type: String,
        required : true
    },

    createdAt : {
        type: Date,
        required : true
    },
    
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'City',
        required : false
    },
    address: {
        type:String,
        required : true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : false
    }
})

module.exports = mongoose.model('Order',orderSchema);