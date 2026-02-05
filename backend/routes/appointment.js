const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');
const appointmentController = require('../controllers/appointmentController');

// Test route
router.get('/', (req, res) => {
  res.json({ message: 'API đặt lịch đang hoạt động!' });
});

// Đặt lịch
router.post('/', auth, appointmentController.createAppointment);

// Xem lịch cá nhân
router.get('/my-appointments', auth, appointmentController.getMyAppointments);

// Hủy lịch
router.delete('/:id', auth, appointmentController.cancelAppointment);

// Bác sĩ xác nhận lịch
router.put('/:id/confirm', auth, appointmentController.confirmAppointment);

module.exports = router;