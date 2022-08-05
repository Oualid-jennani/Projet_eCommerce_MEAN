const mongoose = require('mongoose');

const procuctSchema = mongoose.Schema({

    name: {
        type : String,
        required : true
    },

    images : { 
        type : String,
        required : false
    },

    price: {
        type: Number,
        required : true
    },

    compareAtPrice: {
        type: Number,
        required : true
    },

    description: {
        type : String,
        required : true
    },

    status : {
        type: String,
        required : true
    },

    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required : true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : false
    },

    createdAt : {
        type: Date,
        required : true
    },
    
})

module.exports = mongoose.model('Product',procuctSchema)