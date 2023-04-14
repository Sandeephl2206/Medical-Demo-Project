const mongoose = require('mongoose')
const validator = require('validator')
// const ProductType = require("../Modal/productTypeModel")
const ProductSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please provide the username"],
        unique: true
    },
    price:{
        type:Number,
        required:[true,"Please provide Price Address"],
    },
    quantity:{
        type:Number,
        min : 1,
    },
    productType: {
        type: mongoose.Schema.ObjectId,
        ref: 'ProductType',
      },
    timeStamp : {
        type:Date,
    },
    likes : {
        type:Number,
        default : 0,
    },
    dislikes : {
        type:Number,
        default : 0,
    },
    comment : {
        type: String,
        default : 'No Comments'
    },
    photo : {
        type: String,
        default: "no photo"
    }
})

ProductSchema.pre("save",function(next){
    this.timeStamp  = Date.now();
    next();
})

module.exports = mongoose.model("Product",ProductSchema)  