const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  timeSlots: [{
    start: { type: String, required: true }, // "08:00"
    end: { type: String, required: true },   // "08:30"
    status: { type: String, enum: ['available', 'booked', 'unavailable'], default: 'available' }
  }],
});

module.exports = mongoose.model('Availability', availabilitySchema);