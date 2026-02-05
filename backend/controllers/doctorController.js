const User = require('../models/User');
const DoctorProfile = require('../models/DoctorProfile');

exports.getDoctors = async (req, res) => {
  try {
    // Lấy tất cả user có role 'doctor' và populate profile
    const doctors = await User.find({ role: 'doctor' }).populate('doctorProfile');
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id)
      .populate('doctorProfile');
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({ error: 'Không tìm thấy bác sĩ' });
    }
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};