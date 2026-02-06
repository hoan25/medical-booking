# Medical Booking - Hệ thống Đặt Lịch Khám Trực Tuyến



##  Giới Thiệu

**Medical Booking** là một hệ thống web cho phép bệnh nhân đặt lịch khám trực tuyến, quản lý lịch hẹn, và bác sĩ quản lý lịch khám một cách hiệu quả. Hệ thống giải quyết vấn đề đặt lịch truyền thống, giảm thời gian chờ đợi và tăng tỉ lệ hẹn thành công.

### Mục Tiêu Chính

- ✅ Giảm thời gian đặt lịch (< 2 phút)
- ✅ Quản lý lịch khám cho bác sĩ và bệnh nhân
- ✅ Nâng cao trải nghiệm người dùng (UX thân thiện)

---

##  Kiến Trúc Hệ Thống

```
┌─────────────────────────────────────────────────────┐
│               Frontend (React)                       │
│  Dashboard | Doctors | Booking | Login | Register   │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP/REST
                       ↓
┌─────────────────────────────────────────────────────┐
│            Backend (Node.js + Express)              │
│  Routes → Controllers → Models → Middleware         │
└──────────────────────┬──────────────────────────────┘
                       │ Mongoose ORM
                       ↓
┌─────────────────────────────────────────────────────┐
│          Database (MongoDB)                         │
│  Users | Doctors | Appointments | Availability     │
└─────────────────────────────────────────────────────┘
```

---

##  Công Nghệ & Công Cụ

### Frontend
- **React** — UI library
- **React Router** — Routing
- **Axios** — HTTP client
- **CSS** — Styling

### Backend
- **Node.js** — Runtime
- **Express** — Web framework
- **Mongoose** — MongoDB ORM
- **JWT** — Authentication

### Database
- **MongoDB** — NoSQL database (Atlas hoặc Local)

### Tools & DevOps
- **Git** — Version control
- **Postman** — API testing
- **Jest** — Unit testing (tùy chọn)
- **npm** — Package manager

---

##  Cấu Trúc Thư Mục

```
medical-booking/
│
├── backend/                          # Node.js API server
│   ├── controllers/                  # Business logic
│   │   ├── authController.js
│   │   ├── doctorController.js
│   │   └── appointmentController.js
│   ├── middleware/                   # Auth, validation
│   │   └── auth.js
│   ├── models/                       # Mongoose schemas
│   │   ├── User.js
│   │   ├── DoctorProfile.js
│   │   ├── Appointment.js
│   │   ├── Availability.js
│   │   └── Specialty.js
│   ├── routes/                       # API endpoints
│   │   ├── auth.js
│   │   ├── doctor.js
│   │   └── appointment.js
│   ├── utils/                        # Helpers
│   ├── package.json
│   └── server.js                     # Entry point
│
├── frontend/                         # React application
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Doctors.jsx
│   │   │   ├── DoctorDetail.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx                  # Main app component
│   │   ├── index.js                 # Entry point
│   │   ├── App.css
│   │   └── index.css
│   ├── public/
│   │   ├── index.html               # HTML template
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── package.json
│   └── README.md
│
├── README.md                         # This file
├── .gitignore
└── README_presentation.md            # Presentation guide
```

---

##  Hướng Dẫn Cài Đặt & Chạy

### Yêu Cầu
- **Node.js** >= 14.x
- **npm** >= 6.x
- **MongoDB** (Atlas cloud hoặc local)
- **Git**

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-org/medical-booking.git
cd medical-booking
```

### 2️⃣ Cài Đặt Backend

```bash
cd backend
npm install
```

**Cấu hình `.env` (Backend):**

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medical-booking
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

**Khởi chạy Backend:**

```bash
npm start
# hoặc chế độ development (auto-reload)
npm run dev
```

Backend sẽ chạy tại `http://localhost:5000`

### 3️⃣ Cài Đặt Frontend

```bash
cd frontend
npm install
```

**Cấu hình `.env` (Frontend):**

```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Khởi chạy Frontend:**

```bash
npm start
```

Frontend sẽ mở tại `http://localhost:3000`

---

##  Mô Hình Dữ Liệu

### Entities Chính

#### 1. **User** (Bệnh nhân & Bác sĩ)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (enum: ['patient', 'doctor', 'admin']),
  createdAt: Date,
  updatedAt: Date
}
```

#### 2. **DoctorProfile** (Thông tin bác sĩ)
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  specialty: ObjectId (ref: Specialty),
  qualifications: String,
  experience: Number (năm),
  bio: String,
  fees: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### 3. **Appointment** (Lịch hẹn)
```javascript
{
  _id: ObjectId,
  patientId: ObjectId (ref: User),
  doctorId: ObjectId (ref: User),
  appointmentDate: Date,
  startTime: String (HH:MM),
  endTime: String (HH:MM),
  status: String (enum: ['pending', 'confirmed', 'completed', 'cancelled']),
  reason: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### 4. **Availability** (Khung giờ sẵn sàng)
```javascript
{
  _id: ObjectId,
  doctorId: ObjectId (ref: User),
  dayOfWeek: Number (0-6),
  startTime: String (HH:MM),
  endTime: String (HH:MM),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### 5. **Specialty** (Chuyên khoa)
```javascript
{
  _id: ObjectId,
  name: String (unique),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

##  API Endpoints Chính

###  Authentication

| Method | Endpoint | Mô Tả |
|--------|----------|-------|
| POST | `/api/auth/register` | Đăng ký tài khoản |
| POST | `/api/auth/login` | Đăng nhập |
| POST | `/api/auth/logout` | Đăng xuất |

**Ví dụ Request (POST /auth/register):**
```json
{
  "name": "Nguyễn Văn A",
  "email": "a@example.com",
  "password": "password123",
  "phone": "0912345678",
  "role": "patient"
}
```

###  Doctors

| Method | Endpoint | Mô Tả |
|--------|----------|-------|
| GET | `/api/doctors` | Lấy danh sách bác sĩ |
| GET | `/api/doctors/:id` | Chi tiết bác sĩ |
| POST | `/api/doctors` | Tạo hồ sơ bác sĩ (auth required) |
| PUT | `/api/doctors/:id` | Cập nhật thông tin bác sĩ |

**Ví dụ Response (GET /doctors):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": { "name": "Bác sĩ Tèo", "email": "teo@hospital.com" },
      "specialty": "Nha khoa",
      "experience": 10,
      "fees": 200000
    }
  ]
}
```

###  Appointments

| Method | Endpoint | Mô Tả |
|--------|----------|-------|
| GET | `/api/appointments` | Lấy lịch hẹn của user |
| POST | `/api/appointments` | Đặt lịch hẹn mới |
| PUT | `/api/appointments/:id` | Cập nhật lịch hẹn |
| DELETE | `/api/appointments/:id` | Hủy lịch hẹn |

**Ví dụ Request (POST /appointments):**
```json
{
  "doctorId": "507f1f77bcf86cd799439011",
  "appointmentDate": "2024-03-15",
  "startTime": "10:00",
  "reason": "Khám sức khỏe định kỳ"
}
```

---

##  Giao Diện Chính

### Trang Chính
- **Dashboard** — Tổng quan lịch hẹn sắp tới
- **Doctors** — Danh sách bác sĩ theo chuyên khoa
- **DoctorDetail** — Chi tiết bác sĩ & form đặt lịch
- **Login / Register** — Xác thực người dùng

### Luồng UX Chính
```
Register/Login
    ↓
Dashboard (xem lịch cá nhân)
    ↓
Doctors (tìm bác sĩ theo chuyên khoa)
    ↓
DoctorDetail (xem thông tin chi tiết)
    ↓
Booking Form (chọn ngày giờ)
    ↓
Confirmation (kiểm tra & xác nhận)
    ↓
Success (nhận email xác nhận)
```

---

## 🔒 Bảo Mật & Xác Thực

### Authentication
- Sử dụng **JWT (JSON Web Token)** để xác thực người dùng
- Token được lưu tại client (localStorage hoặc cookies)
- Mỗi request đến API đều kèm Authorization header: `Authorization: Bearer <token>`

### Phân Quyền (Authorization)
- **patient** — Xem bác sĩ, đặt/xem lịch của bản thân
- **doctor** — Xem lịch hẹn, quản lý khung giờ sẵn sàng
- **admin** — Quản lý toàn bộ hệ thống

### Middleware Auth
File: `backend/middleware/auth.js`
```javascript
// Kiểm tra JWT + phân quyền
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  // Verify JWT...
};
```

### Bảo Mật Dữ Liệu
- ✅ Mật khẩu được hash bằng bcrypt
- ✅ Input validation & sanitization
- ✅ Không lưu dữ liệu nhạy cảm (SSN, số thẻ)
- ✅ HTTPS được khuyến nghị cho production

---

## ✅ Tính Năng Đã Triển Khai

### Backend
- ✅ Mô hình Mongoose cho 5 entities chính
- ✅ Controllers xử lý logic: auth, doctor, appointment
- ✅ Middleware xác thực JWT
- ✅ Routes API RESTful
- ✅ Xử lý lỗi cơ bản

### Frontend
- ✅ Giao diện đăng ký / đăng nhập
- ✅ Danh sách bác sĩ & trang chi tiết
- ✅ Form đặt lịch hẹn
- ✅ Dashboard xem lịch cá nhân
- ✅ Header & Footer thống nhất
- ✅ Xử lý trạng thái (loading, success, error)

---

##  Kiểm Thử

### API Testing với Postman

Import file `postman_collection.json` (nếu có) vào Postman hoặc tạo requests:

**Test Register:**
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "patient"
}
```

**Test Get Doctors:**
```
GET http://localhost:5000/api/doctors
```

### Test Case Chính
- [ ] Đăng ký tài khoản mới
- [ ] Đăng nhập & nhận JWT token
- [ ] Lấy danh sách bác sĩ
- [ ] Xem chi tiết bác sĩ
- [ ] Đặt lịch hẹn mới
- [ ] Xem lịch của bản thân
- [ ] Hủy lịch hẹn

---

##  Triển Khai (Deployment)

### Frontend - Vercel / Netlify

```bash
# Build production
cd frontend
npm run build

# Deploy lên Vercel
vercel
```

### Backend - Heroku / VPS

**Chuẩn bị:**
1. Tạo file `Procfile` (cho Heroku):
   ```
   web: node backend/server.js
   ```

2. Cấu hình biến môi trường trên Heroku:
   ```bash
   heroku config:set MONGODB_URI="mongodb+srv://..."
   heroku config:set JWT_SECRET="your-secret"
   ```

3. Deploy:
   ```bash
   git push heroku main
   ```

---

##  Lộ Trình & Công Việc Tiếp Theo

###  Hoàn Thành
- [x] Kiến trúc cơ bản (Frontend + Backend)
- [x] Mô hình dữ liệu chính
- [x] API RESTful
- [x] Xác thực JWT
- [x] Giao diện cơ bản

###  Đang Làm / Cần Làm
- [ ] Refresh token & token expiry
- [ ] Real-time notifications (WebSocket)
- [ ] Email confirmation khi đặt lịch
- [ ] Payment integration (nếu cần)
- [ ] Unit tests & integration tests
- [ ] Rate limiting & API throttling
- [ ] Admin dashboard

###  Ước Lượng
- Refresh token: 1 tuần
- Notifications: 2 tuần
- Payment: 3–4 tuần
- Testing: 2–3 tuần

---

##  Rủi Ro & Giải Pháp

| Rủi Ro | Tác Động | Giải Pháp |
|--------|---------|----------|
| Concurrency booking (2 người book cùng slot) | Cao | Sử dụng atomic transaction, lock row |
| JWT token bị đánh cắp | Cao | Refresh token, expiry hợp lý, HTTPS |
| Downtime database | Cao | Backup tự động, monitoring alerts |
| Input injection (SQL/XSS) | Trung | Input validation, parameterized queries |
| Performance chậm | Trung | Indexing DB, caching, pagination |

---


##  Đóng Góp

Các pull request được hoan nghênh. Trước khi tạo PR lớn, hãy mở issue để thảo luận thay đổi.

---

##  Ghi Chú

- Hệ thống hiện đang ở phiên bản **1.0.0** (beta)
- Cần thử nghiệm người dùng thực tế trước khi phát hành chính thức
- Khuyến nghị backup database hàng ngày

---

**Cập nhật lần cuối:** 6 tháng 2, 2026  
**Phiên bản:** 1.0.0  
**Trạng thái:** Beta — Sẵn sàng thử nghiệm
