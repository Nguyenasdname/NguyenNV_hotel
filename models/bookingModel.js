const mongoose = require('mongoose')
const { Schema } = mongoose

const bookingSchema = new Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    checkInDate: Date,
    checkOutDate: Date,
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
})

module.exports = mongoose.model('Booking', bookingSchema)