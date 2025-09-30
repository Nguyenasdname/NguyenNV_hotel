const mongoose = require('mongoose')
const { Schema } = mongoose

const roomSchema = new Schema({
    name: String,
    price: Number
})

module.exports = mongoose.model('Room', roomSchema)