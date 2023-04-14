const mongoose = require('mongoose');

const connectDB = (req,res) =>{
    try {
        mongoose.connect('mongodb+srv://sandy:sandy@cluster0.b5kqtc7.mongodb.net/?retryWrites=true&w=majority')
        console.log("DB connected");
    } catch (error) {
        throw new Error("Db Not connected")
    }
}
module.exports = { connectDB };
