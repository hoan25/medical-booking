const Appointment = require('../models/Appointment');

// Tạo lịch hẹn
exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, date, timeStart, timeEnd, reason } = req.body;
    const patientId = req.user.id;

    if (!doctorId || !date || !timeStart || !timeEnd) {
      return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
    }

    const appointment = new Appointment({
      patientId,
      doctorId,
      date: new Date(date),
      timeStart,
      timeEnd,
      reason: reason || 'Không có lý do cụ thể',
      status: 'pending'
    });

    await appointment.save();

    res.status(201).json({
      message: 'Đặt lịch thành công',
      appointment
    });
  } catch (err) {
    console.error('Lỗi tạo lịch hẹn:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
};

// Lấy lịch cá nhân
exports.getMyAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let query = role === 'patient' ? { patientId: userId } : { doctorId: userId };

    const appointments = await Appointment.find(query)
      .populate('doctorId', 'fullName specialty')
      .populate('patientId', 'fullName phone')
      .sort({ date: 1 });

    res.json(appointments);
  } catch (err) {
    console.error('Lỗi lấy lịch:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
};

// Hủy lịch
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: 'Không tìm thấy lịch hẹn' });
    }

    if (appointment.patientId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Bạn không có quyền hủy lịch này' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.json({ message: 'Hủy lịch thành công', appointment });
  } catch (err) {
    console.error('Lỗi hủy lịch:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
};

// Xác nhận lịch (bác sĩ thực hiện)
exports.confirmAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: 'Không tìm thấy lịch hẹn' });
    }

    // Chỉ bác sĩ được liên kết với lịch mới được xác nhận
    if (appointment.doctorId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Bạn không có quyền xác nhận lịch này' });
    }

    appointment.status = 'confirmed';
    await appointment.save();

    res.json({ message: 'Xác nhận lịch thành công', appointment });
  } catch (err) {
    console.error('Lỗi xác nhận lịch:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
};