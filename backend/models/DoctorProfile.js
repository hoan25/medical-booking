const mongoose = require('mongoose');

const doctorProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialty: { type: String, default: 'Chưa cập nhật' },
  experienceYears: { type: Number, default: 0 },
  clinicName: { type: String },
  clinicAddress: { type: String },
  description: { type: String },
  priceRange: { type: String, default: '200000 - 800000 VNĐ' },
  avatar: { type: String },
});

module.exports = mongoose.model('DoctorProfile', doctorProfileSchema);