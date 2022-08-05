const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type : String,
        required : true
    },

    email : {
        type :String,
        required : false
    }, 

    phoneNumber : {
        type :String,
        required : false
    },
    
    role : { 
        type :String,
        required : false
    },

    password : {
        type:String,
        required : true,
        select :false
    },

})

module.exports = mongoose.model('User',userSchema);