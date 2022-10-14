const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config();

const uri = process.env.MONGO_URI;

const connectDB = async ()=>{
    const connection = await mongoose.connect(uri,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log(`mongoose connected: ${connection.connection.host}`)
}

module.exports = connectDB