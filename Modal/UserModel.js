const mongoose = require('mongoose')
const validator = require('validator')
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please provide the username"]
    },
    email:{
        type:String,
        required:[true,"Please provide Email Address"],
        lowercase:true,
        unique: true,
        validate: [validator.isEmail,'Please Provide Valid Email']
    },
    password:{
        type:String,
        required:true,
        // unique:true,
        minlength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minlength:8,
        validate : {
            validator:function(el){
                return el === this.password;
            },
            message : "Passwords does not match"
        }
    }
})


module.exports = mongoose.model("User",UserSchema)  