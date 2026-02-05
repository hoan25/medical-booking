import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/doctors');
        setDoctors(res.data);
      } catch (err) {
        setError('Không thể tải danh sách bác sĩ');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (loading) return <div className="text-center mt-20 text-xl">Đang tải danh sách bác sĩ...</div>;
  if (error) return <div className="text-center mt-20 text-red-600 text-xl">{error}</div>;

  return (
    <div className="container">
      <h2 className="text-4xl font-bold text-center mb-10 text-blue-800">Danh sách bác sĩ</h2>
      <div className="grid-3">
        {doctors.map(doctor => (
          <div key={doctor._id} className="card">
            <div className="p-2">
              <h3 className="text-2xl font-bold">{doctor.fullName}</h3>
              <p className="text-lg text-blue-600 mt-2">
                {doctor.doctorProfile?.specialty || 'Chưa cập nhật chuyên khoa'}
              </p>
              <p className="muted mt-2">
                Kinh nghiệm: {doctor.doctorProfile?.experienceYears || 0} năm
              </p>
              <p className="muted mt-1">
                Giá khám: {doctor.doctorProfile?.priceRange || 'Liên hệ'}
              </p>
              <div className="mt-6">
                <Link to={`/doctors/${doctor._id}`} className="btn">
                  Xem chi tiết & Đặt lịch
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {doctors.length === 0 && (
        <p className="text-center text-xl muted mt-10">Hiện chưa có bác sĩ nào. Hãy đăng ký làm bác sĩ!</p>
      )}
    </div>
  );
};

export default Doctors;