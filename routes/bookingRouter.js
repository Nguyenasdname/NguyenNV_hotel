const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.route('/bookings')
    .get(bookingController.getAllBooking)
    .post(bookingController.createBooking)

router.route('/bookingByDate')
    .get(bookingController.getBookingByDate)
router.route('/bookings/:id')
    .delete(bookingController.deleteBooking)
module.exports = router