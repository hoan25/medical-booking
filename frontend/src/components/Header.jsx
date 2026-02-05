import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, handleLogout }) => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Hệ thống Đặt lịch khám bệnh</h1>
        <nav className="space-x-6 flex items-center">
          <Link to="/" className="hover:underline">Trang chủ</Link>
          <Link to="/doctors" className="hover:underline">Danh sách bác sĩ</Link>

          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="hover:underline font-semibold">Dashboard</Link>
              <button 
                onClick={handleLogout}
                className="hover:underline text-red-300 font-medium px-4 py-2 rounded transition hover:bg-red-700"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Đăng nhập</Link>
              <Link to="/register" className="hover:underline">Đăng ký</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
