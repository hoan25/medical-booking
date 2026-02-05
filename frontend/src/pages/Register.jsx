import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('patient');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { email, password, fullName, phone, role });
      localStorage.setItem('token', res.data.token);
      alert('Đăng ký thành công!');
    } catch (err) {
      alert('Lỗi: ' + err.response.data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Đăng ký</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Họ tên" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-2 mb-4 border" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-4 border" required />
        <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-4 border" required />
        <input type="text" placeholder="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 mb-4 border" />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 mb-4 border">
          <option value="patient">Bệnh nhân</option>
          <option value="doctor">Bác sĩ</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full p-2 bg-green-600 text-white">Đăng ký</button>
      </form>
    </div>
  );
};

export default Register;