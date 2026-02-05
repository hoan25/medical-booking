// src/pages/DoctorDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const DoctorDetail = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    date: '',
    timeStart: '',
    timeEnd: '',
    reason: '',
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/doctors/${id}`);
        setDoctor(res.data);
      } catch (err) {
        setError('Không thể tải thông tin bác sĩ');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setMessage('');

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token || !user.id) {
      setMessage('Vui lòng đăng nhập để đặt lịch khám');
      setSubmitLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/appointments',
        {
          patientId: user.id,
          doctorId: id,
          date: formData.date,
          timeStart: formData.timeStart,
          timeEnd: formData.timeEnd,
          reason: formData.reason,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('Đặt lịch thành công! ' + res.data.message);
      setFormData({ date: '', timeStart: '', timeEnd: '', reason: '' });
    } catch (err) {
      setMessage('Lỗi: ' + (err.response?.data?.error || 'Không thể đặt lịch'));
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-20 text-xl text-gray-600">Đang tải thông tin bác sĩ...</div>;

  if (error || !doctor) {
    return (
      <div className="text-center mt-20 text-xl text-red-600">
        {error || 'Không tìm thấy thông tin bác sĩ'}
        <Link to="/doctors" className="block mt-6 text-blue-600 hover:underline">
          ← Quay lại danh sách bác sĩ
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <Link to="/doctors" className="text-blue-600 hover:underline font-medium text-lg">
          ← Quay lại danh sách bác sĩ
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-2">{doctor.fullName}</h1>
      <p className="text-xl text-blue-600 mb-8">
        {doctor.doctorProfile?.specialty || 'Chuyên khoa chưa cập nhật'}
      </p>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-4">
              <strong className="text-gray-700">Kinh nghiệm:</strong>{' '}
              {doctor.doctorProfile?.experienceYears || 0} năm
            </p>
            <p className="text-lg mb-4">
              <strong className="text-gray-700">Phòng khám:</strong>{' '}
              {doctor.doctorProfile?.clinicName || 'Chưa cập nhật'}
            </p>
            <p className="text-lg mb-4">
              <strong className="text-gray-700">Địa chỉ:</strong>{' '}
              {doctor.doctorProfile?.clinicAddress || 'Chưa cập nhật'}
            </p>
            <p className="text-lg mb-4">
              <strong className="text-gray-700">Giá khám:</strong>{' '}
              {doctor.doctorProfile?.priceRange || 'Liên hệ trực tiếp'}
            </p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700 mb-2">Giới thiệu:</p>
            <p className="text-gray-600 leading-relaxed">
              {doctor.doctorProfile?.description ||
                'Bác sĩ tận tâm, giàu kinh nghiệm trong chẩn đoán và điều trị các bệnh lý phổ biến. Luôn lắng nghe và tư vấn tận tình cho bệnh nhân.'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Đặt lịch khám với bác sĩ</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Ngày khám *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Giờ bắt đầu *</label>
              <input
                type="time"
                name="timeStart"
                value={formData.timeStart}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Giờ kết thúc *</label>
              <input
                type="time"
                name="timeEnd"
                value={formData.timeEnd}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">Lý do khám (tùy chọn)</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="4"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Mô tả triệu chứng hoặc lý do khám..."
            />
          </div>

          <button
            type="submit"
            disabled={submitLoading}
            className={`w-full py-4 rounded-lg text-white font-bold text-lg transition ${submitLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {submitLoading ? 'Đang gửi yêu cầu...' : 'Xác nhận đặt lịch'}
          </button>
        </form>

        {message && (
          <div className={`mt-8 p-5 rounded-lg text-center font-medium text-lg ${message.includes('thành công') ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDetail;