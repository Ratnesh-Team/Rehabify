# 📋 Rehabify - Project Overview & Report

## 🎯 Project Summary

**Rehabify** is an all-in-one management and coordination platform designed specifically for **Nasha Mukti Kendras** (rehabilitation and de-addiction centers) across India. The platform streamlines operations and facilitates efficient communication between multiple user roles: Super Admins, Administrators, Doctors, and End Users.

---

## 🏗️ Project Architecture

### **Technology Stack**

#### Backend
- **Language**: Go (Golang)
- **Web Framework**: Gin
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: Swagger/OpenAPI
- **Version**: Go 1.21.1
- **Server Port**: 3000

#### Frontend
- **Framework**: React 18.2.0
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **UI Frameworks**: Material-UI (MUI), Framer Motion
- **Calendar**: FullCalendar
- **Charts**: ApexCharts
- **Internationalization**: i18next
- **Table Library**: TanStack React Table
- **Version**: 2.1.0

---

## ✨ Key Features

### 1. **🔐 Role-Based Access Control**
   - **Super Admin**: Platform-wide management and approval authority
   - **Admin**: Nasha Mukti Kendra center management
   - **Doctor**: Healthcare provider registration and patient management
   - **User**: Patient/End users searching for rehabilitation centers

### 2. **📝 Registration Management**
   - **Admin Registration**: Centers can register and manage their profile
   - **Doctor Registration**: Healthcare professionals link to specific centers
   - **User Registration**: End users create profiles for service access
   - **Super Admin Approval**: All registrations require super admin approval

### 3. **📍 Location-Based Services**
   - Users can search for and discover nearest Nasha Mukti Kendras
   - Location-based filtering and results
   - Center information and doctor profiles

### 4. **🛡️ Security Features**
   - Secure JWT-based authentication
   - Password hashing with Salt
   - Rate limiting to prevent abuse
   - CORS configuration for secure cross-origin requests
   - Role-based authorization

### 5. **📊 Admin Dashboard**
   - Center management interface
   - User and doctor management
   - Analytics and reporting
   - Calendar integration for appointments/schedules

### 6. **🌍 Internationalization**
   - Multi-language support using i18next
   - Language switching capabilities
   - Localized UI components

---

## 📁 Project Structure

```
Rehabify/
├── Backend/                    # Go backend service
│   ├── main.go                 # Entry point
│   ├── config/                 # Configuration files
│   │   ├── env.go              # Environment variable loading
│   │   └── mongo_config.go     # MongoDB connection config
│   ├── controllers/            # Route handlers
│   │   ├── auth_controller.go
│   │   ├── doctor_controller.go
│   │   ├── home_remedies.go
│   │   ├── user_controllers.go
│   │   └── NMK_controllers.go
│   ├── middleware/             # Express-like middleware
│   │   ├── auth_middleware.go  # JWT validation
│   │   └── rate_limiter_middleware.go
│   ├── models/                 # Data models
│   │   ├── user.go
│   │   ├── doctor.go
│   │   ├── credential.go
│   │   └── ...
│   ├── repository/             # Data access layer
│   │   └── mongo_repository.go
│   ├── routes/                 # API endpoints
│   │   └── routes.go
│   ├── utils/                  # Utility functions
│   │   ├── hash.go             # Password hashing
│   │   ├── jwtgenerator.go     # Token generation
│   │   └── jwtvalidator.go     # Token validation
│   ├── docs/                   # Swagger documentation
│   └── go.mod                  # Go dependencies
│
└── Frontend/                   # React + TypeScript
    ├── src/
    │   ├── App.tsx             # Main app component
    │   ├── main.tsx            # Entry point
    │   ├── components/         # Reusable components
    │   ├── views/              # Page components
    │   ├── services/           # API integration
    │   │   ├── ApiService.ts   # Axios instance
    │   │   ├── AuthService.ts
    │   │   ├── UserService.ts
    │   │   ├── DoctorService.ts
    │   │   └── ...
    │   ├── store/              # Redux store
    │   │   ├── index.ts
    │   │   ├── rootReducer.ts
    │   │   └── slices/
    │   ├── hooks/              # Custom React hooks
    │   ├── configs/            # Application configs
    │   ├── constants/          # App constants
    │   ├── locales/            # i18n translations
    │   ├── utils/              # Utility functions
    │   └── assets/             # Images, icons, styles
    ├── vite.config.ts          # Vite configuration
    ├── tailwind.config.cjs     # Tailwind CSS config
    ├── tsconfig.json           # TypeScript config
    └── package.json            # Dependencies

```

---

## 🔄 API Endpoints Overview

### Authentication Endpoints
- `POST /api/auth/signup` - User/Admin/Doctor registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/logout` - User logout

### User Endpoints
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user

### Doctor Endpoints
- `POST /api/doctors` - Register doctor
- `GET /api/doctors` - List all doctors
- `GET /api/doctors/:id` - Get doctor details
- `PUT /api/doctors/:id` - Update doctor profile

### Center/NMK Endpoints
- `POST /api/centers` - Register center
- `GET /api/centers` - List all centers
- `GET /api/centers/search` - Search centers by location
- `GET /api/centers/:id` - Get center details

### Home Remedies Endpoints
- `GET /api/home-remedies` - Get remedy suggestions

---

## 👥 User Roles & Credentials

### Super Admin
- **Email**: `superadmin@gmail.com`
- **Password**: `password@1`
- **Capabilities**: Full platform control, approve registrations, manage all entities

### Admin
- **Email**: `admin@gmail.com`
- **Password**: `123Qwe1`
- **Capabilities**: Manage their center, doctors, and users

### User
- **Email**: `user@gmail.com`
- **Password**: `123Qwe1`
- **Capabilities**: Search centers, book appointments, view doctor profiles

---

## 🚀 Deployment Information

- **Frontend Deployment**: Vite-based build system
- **Backend Deployment**: Docker support available (Dockerfile included)
- **Production URL**: https://rehabify-production.up.railway.app
- **Development URL**: http://localhost:3000

---

## 📚 Documentation

- **API Documentation**: Available at `http://localhost:3000/swagger-ui/index.html`
- **Frontend README**: See `Frontend/README.md`
- **Backend README**: See `Backend/README.md`

---

## 🤝 Contributing

- **Default Branch**: `dev` (development branch for pull requests)
- **Main Branch**: `main` (production)
- **Guidelines**: See `CONTRIBUTING.md`

---

## 📦 Dependencies Summary

### Backend Key Dependencies
- `gin-gonic/gin` - Web framework
- `mongodb/mongo-driver` - MongoDB driver
- `dgrijalva/jwt-go` - JWT authentication
- `swaggo/gin-swagger` - API documentation
- `gin-cors` - CORS middleware

### Frontend Key Dependencies
- `react` - UI library
- `@reduxjs/toolkit` - State management
- `axios` - HTTP client
- `@mui/material` - UI components
- `@fullcalendar/react` - Calendar
- `apexcharts` - Charts
- `i18next` - Internationalization
- `tailwindcss` - Utility CSS framework

---

## 🔐 Security Measures

1. **JWT Authentication**: Secure token-based authentication
2. **Password Hashing**: Salted hash for password storage
3. **CORS Configuration**: Restricted cross-origin access
4. **Rate Limiting**: Prevents API abuse and DDoS attacks
5. **Role-Based Authorization**: Access control based on user roles
6. **Environment Variables**: Sensitive data stored in `.env` files

---

## 📊 Version Information

- **Frontend Version**: 2.1.0
- **Backend Go Version**: 1.21.1
- **React Version**: 18.2.0
- **TypeScript Version**: Latest

---

## 🛠️ Setup Requirements

### System Requirements
- Node.js 16+ (for Frontend)
- Go 1.21.1+ (for Backend)
- MongoDB instance (local or cloud)
- npm or yarn (package managers)

### Development Tools
- Git
- Docker (optional, for containerization)
- VS Code or IDE of choice

---

## 📝 Notes

- **MongoDB Connection**: Requires credentials - contact `ratneshmaurya2311@gmail.com`
- **Salt Value**: Pre-configured in environment variables for password hashing
- **CORS**: Currently allows all origins (`*`) - should be restricted in production
- **Rate Limiting**: Implemented with 1-minute max age
- **API Rate Limit**: Middleware prevents abuse

---

## 📞 Support & Contact

- **Repository**: https://github.com/Ratnesh-Team/Rehabify
- **Stars**: Check GitHub for latest metrics
- **Issues**: Report bugs via GitHub Issues
- **PRs**: Submit to `develop` branch

---

**Last Updated**: April 2026
**Platform**: Nasha Mukti Kendra Management System
**Status**: Active Development
