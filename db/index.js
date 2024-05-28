const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
// Connect to MongoDB
mongoose.connect(MONGO_CONNECTION_STRING).then(() => {
    console.log("MongoDB Connected");
}).catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if connection fails
});

// Define schemas
const ToDoSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        default:false
    }
});


const ToDo = mongoose.model('ToDo', ToDoSchema);


module.exports = {
    ToDo
}