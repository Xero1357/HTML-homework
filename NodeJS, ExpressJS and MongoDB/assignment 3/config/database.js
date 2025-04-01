require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.mongoCON;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected')
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

module.exports = connectDB;