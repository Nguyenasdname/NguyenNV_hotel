const Booking = require('../models/bookingModel')

exports.createBooking = async (req, res) => {
    try {
        const { customerId, roomId, checkInDate, checkOutDate } = req.body

        const checkBookingRoom = await Booking.findOne({
            roomId,
            status: { $in: ['pending', 'confirmed'] },
            $or: [
                { checkInDate: { $lt: checkOutDate }, checkOutDate: { $gt: checkInDate } }
            ]
        })
        if (checkBookingRoom) return res.status(400).json({ message: `Phòng đã được đặt trong thời gian này` })

        const booking = await Booking.create({ customerId, roomId, checkInDate, checkOutDate })
        res.status(201).json(booking)
    } catch (err) {
        res.json({ message: `${err}` })
    }
}

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
        if (!booking) return res.status(404).json({ message: `Không tìm thấy đơn đặt phòng` })

        if (new Date() >= new Date(booking.checkInDate)) {
            return res.status(400).json({ message: 'Không thể hủy sau ngày nhận phòng' })
        }
        booking.status = 'cancelled'
        await booking.save()
        res.json({ message: `Đã hủy đơn đặt phòng` })

    } catch (err) {
        res.json({ message: `${err}` })
    }
}

exports.getAllBooking = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = 10
    const bookings = await Booking.find().skip((page - 1) * limit).limit(limit)

    if (bookings.length === 0) return res.json({ message: `Không có đơn đặt phòng nào cả` })
    res.json(bookings)
}

exports.getBookingByDate = async (req, res) => {
    const { from, to } = req.query
    if (new Date(from) >= new Date(to)) {
        return res.status(400).json({ message: `Ngày nhận phòng phải nhỏ hơn ngày trả phòng` })
    }

    const bookings = await Booking.find({
        checkInDate: { $gte: new Date(from) },
        checkOutDate: { $lte: new Date(to) }
    })
    if (bookings.length === 0) return res.json({ message: `Không có đơn đặt phòng nào cả` })
    res.json(bookings)
}