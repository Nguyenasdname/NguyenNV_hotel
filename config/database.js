const mongoose = require('mongoose');
require('dotenv').config();
const fs = require('fs');
const User = require('../models/userModel')
const Room = require('../models/roomModel')
const Booking = require('../models/bookingModel')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
        const data = JSON.parse(fs.readFileSync('./hotel.json', 'utf-8'))
        
        await User.deleteMany({})
        await Room.deleteMany({})
        await Booking.deleteMany({})

        await User.insertMany(data.users)
        await Room.insertMany(data.rooms)

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
