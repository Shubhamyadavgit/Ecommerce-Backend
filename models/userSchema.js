const mongoose = require('mongoose');
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required :true,
        trim :true
    },
    email: {
        type:String,
        required :true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email');
        }
    }
},
    password: {
        type:String,
        required :true,
        minlength:6
    },
    mobile: {
        type:String,
        required :true,
        unique : true,
        maxlength : 10
    },
    confirmpassword: {
        type:String,
        required :true,
        minlength:6
    },
    tokens : [
        {
            token : {
                type : String,
                required : true,
            }
        }
    ],
    carts: Array
});

const USER = new mongoose.model("USER",userSchema);

module.exports = USER;