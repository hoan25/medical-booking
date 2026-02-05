// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './index.css'; // hoặc App.css nếu bạn dùng

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-3xl font-bold">Hệ thống Đặt lịch khám bệnh</h1>
          <nav className="mt-2">
            <Link to="/" className="mr-4 hover:underline">Trang chủ</Link>
            <Link to="/login" className="mr-4 hover:underline">Đăng nhập</Link>
            <Link to="/register" className="hover:underline">Đăng ký</Link>
          </nav>
        </header>

        {/* Các Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

// Component Home
function Home() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-4xl font-bold text-blue-700 mb-6">Chào mừng đến với hệ thống đặt lịch khám bệnh</h2>
      <p className="text-xl mb-6">Đặt lịch nhanh chóng, tiện lợi với các bác sĩ uy tín.</p>
      <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-700">
        Tìm bác sĩ ngay
      </button>
    </div>
  );
}

// Component Login (đã kết nối API)
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setMessage('Đăng nhập thành công! Đang chuyển hướng...');
      setTimeout(() => { window.location.href = '/'; }, 1500);
    } catch (err) {
      setMessage('Lỗi: ' + (err.response?.data?.error || 'Không thể kết nối'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 mb-4 border rounded" required />
        <input type="password" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 mb-6 border rounded" required />
        <button type="submit" disabled={loading} className={`w-full p-3 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
          {loading ? 'Đang xử lý...' : 'Đăng nhập'}
        </button>
      </form>
      {message && <p className={`mt-4 text-center ${message.includes('thành công') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
    </div>
  );
}

// Component Register (tương tự, bạn copy và chỉnh nếu cần)
function Register() {
  // ... code tương tự Login, thay đổi API endpoint thành /register và thêm các field fullName, phone, role
  // Để tiết kiệm thời gian, bạn có thể tạm dùng Login làm mẫu và copy sang
  return <div>Trang đăng ký (đang hoàn thiện)</div>;
}

// BẮT BUỘC: Export default ở cuối file
export default App;