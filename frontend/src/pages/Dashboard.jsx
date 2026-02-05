// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token) {
      window.location.href = '/login';
      return;
    }

    setUser(storedUser);

    const fetchAppointments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/appointments/my-appointments', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data);
      } catch (err) {
        setError('Không thể tải danh sách lịch hẹn. Vui lòng thử lại.');
        console.error('Lỗi fetch:', err);
      } finally {
        setLoading(false);
      }
    };

      fetchAppointments();
    }, []);

  const handleCancel = async (appointmentId) => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy lịch hẹn này?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/appointments/${appointmentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAppointments(appointments.map(apt => 
        apt._id === appointmentId ? { ...apt, status: 'cancelled' } : apt
      ));

      alert('Lịch hẹn đã được hủy thành công!');
    } catch (err) {
      alert('Lỗi khi hủy lịch hẹn: ' + (err.response?.data?.error || 'Không thể hủy'));
    }
  };

  const handleConfirm = async (appointmentId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:5000/api/appointments/${appointmentId}/confirm`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAppointments(appointments.map(apt =>
        apt._id === appointmentId ? { ...apt, status: res.data.appointment.status } : apt
      ));

      alert('Đã xác nhận lịch hẹn thành công.');
    } catch (err) {
      alert('Lỗi khi xác nhận lịch: ' + (err.response?.data?.error || 'Không thể xác nhận'));
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-xl">Đang tải danh sách lịch hẹn...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-xl text-red-600">
        {error}
        <Link to="/" className="block mt-6 text-blue-600 hover:underline">
          Quay về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <Link to="/" className="text-blue-600 hover:underline font-medium text-lg">
          ← Quay về trang chủ
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-center mb-10 text-blue-800">
        Dashboard - {user?.role === 'patient' ? 'Bệnh nhân' : user?.role === 'doctor' ? 'Bác sĩ' : 'Admin'}
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Thông tin cá nhân</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <p className="text-lg"><strong>Họ tên:</strong> {user?.fullName || 'Chưa cập nhật'}</p>
          <p className="text-lg"><strong>Email:</strong> {user?.email || 'Chưa cập nhật'}</p>
          <p className="text-lg"><strong>Vai trò:</strong> {user?.role === 'patient' ? 'Bệnh nhân' : user?.role === 'doctor' ? 'Bác sĩ' : 'Admin'}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {user?.role === 'patient' ? 'Lịch hẹn đã đặt' : 'Lịch hẹn nhận được'}
        </h2>

        {appointments.length === 0 ? (
          <div className="text-center text-gray-600 text-xl py-12">
            <p>Hiện chưa có lịch hẹn nào.</p>
            {user?.role === 'patient' && (
              <p className="mt-4">
                Hãy <Link to="/doctors" className="text-blue-600 hover:underline font-medium">đặt lịch khám ngay</Link>!
              </p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {user?.role === 'patient' ? 'Bác sĩ' : 'Bệnh nhân'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày khám</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giờ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lý do</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((apt) => (
                  <tr key={apt._id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {user?.role === 'patient'
                        ? apt.doctorId?.fullName || apt.doctorId || 'Bác sĩ'
                        : apt.patientId?.fullName || apt.patientId || 'Bệnh nhân'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(apt.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {apt.timeStart} - {apt.timeEnd}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {apt.status === 'pending' ? 'Chờ xác nhận' :
                         apt.status === 'confirmed' ? 'Đã xác nhận' : 'Đã hủy'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {apt.reason || 'Không có lý do cụ thể'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {user?.role === 'patient' && apt.status === 'pending' && (
                        <button
                          onClick={() => handleCancel(apt._id)}
                          className="text-red-600 hover:text-red-900 font-medium hover:underline px-3 py-1 rounded transition"
                        >
                          Hủy lịch
                        </button>
                      )}

                      {user?.role === 'doctor' && apt.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleConfirm(apt._id)}
                            className="mr-3 bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                          >
                            Xác nhận
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;