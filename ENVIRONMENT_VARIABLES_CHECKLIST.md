# 🔧 Environment Variables Checklist - Rehabify

This document lists all environment variables required to run both the Frontend and Backend of the Rehabify platform.

---

## 📋 Quick Setup Guide

### For Backend
```bash
cd Backend
cp sample.env .env
# Edit .env and fill in the required variables (see Backend Variables section)
```

### For Frontend
```bash
cd Frontend
cp sample.env .env
# Edit .env and fill in the required variables (see Frontend Variables section)
```

---

## 🔙 Backend Environment Variables

### Location: `/Backend/.env`

Create a `.env` file in the Backend directory with the following variables:

#### **Database Configuration**
| Variable | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| `MONGOURI` | String | ✅ **YES** | MongoDB connection URI | `mongodb+srv://username:password@cluster.mongodb.net/rehabify` |
| `SALT` | String | ✅ **YES** | Salt for password hashing | `E_SALA_CUP_NAMDE` |

#### **Server Configuration**
| Variable | Type | Required | Description | Example | Default |
|----------|------|----------|-------------|---------|---------|
| `PORT` | Number | ❌ No | Server port | `3000` | `3000` |
| `ENV` | String | ❌ No | Environment type | `development` or `production` | `development` |

#### **Authentication Configuration**
| Variable | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| `JWT_SECRET` | String | ✅ **YES** | Secret key for JWT signing | `your-super-secret-jwt-key-12345` |
| `JWT_EXPIRY` | String | ❌ No | JWT expiration time | `7d` |

#### **CORS Configuration (Optional)**
| Variable | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| `ALLOWED_ORIGINS` | String | ❌ No | Comma-separated allowed origins | `http://localhost:3001,https://rehabify.com` |

#### **API Configuration (Optional)**
| Variable | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| `API_BASE_URL` | String | ❌ No | Full backend API URL | `http://localhost:3000` |

---

### Backend Sample `.env` Template

```bash
# ===================================
# DATABASE CONFIGURATION
# ===================================
MONGOURI=mongodb+srv://<username>:<password>@cluster.mongodb.net/rehabify
SALT=E_SALA_CUP_NAMDE

# ===================================
# SERVER CONFIGURATION
# ===================================
PORT=3000
ENV=development

# ===================================
# AUTHENTICATION
# ===================================
JWT_SECRET=your-super-secret-jwt-key-12345
JWT_EXPIRY=7d

# ===================================
# CORS CONFIGURATION
# ===================================
ALLOWED_ORIGINS=http://localhost:3001,http://localhost:3000

# ===================================
# API CONFIGURATION
# ===================================
API_BASE_URL=http://localhost:3000
```

---

## 🎨 Frontend Environment Variables

### Location: `/Frontend/.env` and `.env.local`

Create a `.env` file in the Frontend directory with the following variables:

#### **API Configuration**
| Variable | Type | Required | Description | Example | Note |
|----------|------|----------|-------------|---------|------|
| `VITE_BASE_URL` | String | ✅ **YES** | Backend API base URL | `http://localhost:3000` | Use `http://localhost:3000` for local dev |
| `VITE_API_TIMEOUT` | Number | ❌ No | API request timeout (ms) | `30000` | Default: 30 seconds |

#### **Application Configuration**
| Variable | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| `VITE_APP_NAME` | String | ❌ No | Application name | `Rehabify` |
| `VITE_APP_VERSION` | String | ❌ No | Application version | `2.1.0` |
| `VITE_ENV` | String | ❌ No | Environment type | `development` or `production` |

#### **Third-Party Services**
| Variable | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| `VITE_CLOUDINARY_CLOUD_NAME` | String | ❌ No | Cloudinary cloud name for image uploads | `your-cloud-name` |
| `VITE_GOOGLE_TRANSLATE_API_KEY` | String | ❌ No | Google Translate API key (if using translation) | `your-api-key` |

#### **Feature Flags (Optional)**
| Variable | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| `VITE_ENABLE_ANALYTICS` | Boolean | ❌ No | Enable analytics tracking | `true` or `false` |
| `VITE_ENABLE_MOCK_API` | Boolean | ❌ No | Use mock API (for development) | `false` |
| `VITE_LOG_LEVEL` | String | ❌ No | Console log level | `debug`, `info`, `warn`, `error` |

#### **UI Configuration (Optional)**
| Variable | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| `VITE_THEME_MODE` | String | ❌ No | Default theme | `light` or `dark` |
| `VITE_DEFAULT_LANGUAGE` | String | ❌ No | Default language | `en` or `hi` |

---

### Frontend Sample `.env` Template

#### **Development Environment** (`.env` or `.env.development`)

```bash
# ===================================
# API CONFIGURATION
# ===================================
VITE_BASE_URL=http://localhost:3000
VITE_API_TIMEOUT=30000

# ===================================
# APPLICATION CONFIGURATION
# ===================================
VITE_APP_NAME=Rehabify
VITE_APP_VERSION=2.1.0
VITE_ENV=development

# ===================================
# THIRD-PARTY SERVICES
# ===================================
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_GOOGLE_TRANSLATE_API_KEY=your-api-key

# ===================================
# FEATURE FLAGS
# ===================================
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_MOCK_API=false
VITE_LOG_LEVEL=debug

# ===================================
# UI CONFIGURATION
# ===================================
VITE_THEME_MODE=light
VITE_DEFAULT_LANGUAGE=en
```

#### **Production Environment** (`.env.production`)

```bash
# ===================================
# API CONFIGURATION
# ===================================
VITE_BASE_URL=https://rehabify-production.up.railway.app
VITE_API_TIMEOUT=30000

# ===================================
# APPLICATION CONFIGURATION
# ===================================
VITE_APP_NAME=Rehabify
VITE_APP_VERSION=2.1.0
VITE_ENV=production

# ===================================
# THIRD-PARTY SERVICES
# ===================================
VITE_CLOUDINARY_CLOUD_NAME=your-production-cloud-name
VITE_GOOGLE_TRANSLATE_API_KEY=your-production-api-key

# ===================================
# FEATURE FLAGS
# ===================================
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_MOCK_API=false
VITE_LOG_LEVEL=warn

# ===================================
# UI CONFIGURATION
# ===================================
VITE_THEME_MODE=light
VITE_DEFAULT_LANGUAGE=en
```

---

## ⚠️ Critical Variables Summary

### Must-Have Variables (Cannot run without these)

#### Backend
- ✅ **MONGOURI** - Database connection
- ✅ **SALT** - Password hashing
- ✅ **JWT_SECRET** - Authentication

#### Frontend
- ✅ **VITE_BASE_URL** - Backend API URL

---

## 🚀 Variable Priority Guide

### Priority 1 - CRITICAL (Application won't start without these)
- Backend: `MONGOURI`, `SALT`
- Frontend: `VITE_BASE_URL`

### Priority 2 - HIGH (Required for full functionality)
- Backend: `JWT_SECRET`
- Frontend: None (all non-critical)

### Priority 3 - MEDIUM (Recommended for production)
- Backend: `PORT`, `ENV`, `JWT_EXPIRY`, `ALLOWED_ORIGINS`
- Frontend: `VITE_ENV`, `VITE_CLOUDINARY_CLOUD_NAME`

### Priority 4 - LOW (Optional, for enhanced features)
- Backend: `API_BASE_URL`
- Frontend: All feature flags and UI configurations

---

## 📝 How to Get Required Credentials

### MongoDB URI
**Status**: ⚠️ Must request
```
Contact: ratneshmaurya2311@gmail.com
Subject: MongoDB Connection String Request
Details: Provide your project details and use case
```

### JWT Secret
**Generation Command** (Generate your own):
```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using Python
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Cloudinary (Optional)
Visit: https://cloudinary.com/
- Sign up for free account
- Get `Cloud Name` from dashboard

### Google Translate API (Optional)
Visit: https://cloud.google.com/translate/docs/setup
- Create Google Cloud project
- Enable Translation API
- Generate API key

---

## ✅ Verification Checklist

### Before Starting Backend
- [ ] `.env` file created in `/Backend` directory
- [ ] `MONGOURI` is filled and tested
- [ ] `SALT` is configured
- [ ] `JWT_SECRET` is generated and configured
- [ ] All critical variables are non-empty
- [ ] Run `go mod tidy` to verify dependencies
- [ ] Run `go run main.go` to verify startup

### Before Starting Frontend
- [ ] `.env` file created in `/Frontend` directory
- [ ] `VITE_BASE_URL` points to correct backend
- [ ] Backend is running on the specified URL
- [ ] All critical variables are non-empty
- [ ] Run `npm install` to verify dependencies
- [ ] Run `npm run start` to verify development server

---

## 🔍 Testing Variables

After setting up `.env` files, verify they're loaded correctly:

### Backend Test
```bash
cd Backend
go run main.go
# Should print: "Server listening on http://localhost:3000/"
# Check MongoDB connection works
```

### Frontend Test
```bash
cd Frontend
npm run start
# Should start dev server on http://localhost:5173
# Should be able to make API calls to backend
```

---

## 🚨 Security Best Practices

1. **Never commit `.env` files** to git (add to `.gitignore`)
2. **Rotate JWT_SECRET regularly** in production
3. **Use strong SALT values** - not predictable strings
4. **Restrict ALLOWED_ORIGINS** in production - don't use `*`
5. **Keep MongoDB credentials private** - use specific user accounts
6. **Use HTTPS** for production `VITE_BASE_URL`
7. **Separate dev and production** `.env` files
8. **Review all third-party API keys** for rate limits and costs

---

## 📖 Expected Output

### Successful Backend Startup
```
Server listening on http://localhost:3000/
Swagger available at http://localhost:3000/swagger-ui/index.html
```

### Successful Frontend Startup
```
VITE vX.X.XX ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

---

## 🤝 Need Help?

- Check `sample.env` files in both Backend and Frontend directories
- Review this document for variable descriptions
- Contact project maintainers for specific credentials
- Check GitHub Issues for common setup problems

---

**Created**: April 2026
**Last Updated**: April 2026
**Document Version**: 1.0
