# 🔄 API Endpoint Migration Mapping

**From Go Backend to Next.js Backend**

---

## 📋 Overview

This document maps all API endpoints from the existing Go backend to their Next.js equivalents, helping with implementation and testing.

---

## 🔐 Authentication Endpoints

### Signup Endpoint

#### Current (Go Backend)
```
POST http://localhost:3000/api/auth/signup
```

#### Next.js Equivalent
```
POST http://localhost:3000/api/auth/signup
```

#### Request Body
```json
{
  "email": "user@example.com",
  "password": "Password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "USER",
  "phone": "+1234567890"
}
```

#### Response (Success - 201)
```json
{
  "success": true,
  "message": "Account created successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "role": "USER"
  }
}
```

#### Response (Error - 400)
```json
{
  "error": "Email already registered"
}
```

#### Implementation File
`src/app/api/auth/signup/route.ts`

---

### Signin Endpoint

#### Current (Go Backend)
```
POST http://localhost:3000/api/auth/signin
```

#### Next.js Equivalent
```
POST http://localhost:3000/api/auth/signin
```

#### Request Body
```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

#### Response (Success - 200)
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "role": "USER"
  }
}
```

#### Response (Error - 401)
```json
{
  "error": "Invalid credentials"
}
```

#### Implementation File
`src/app/api/auth/signin/route.ts`

---

### Logout Endpoint

#### Current (Go Backend)
```
POST http://localhost:3000/api/auth/logout
```

#### Next.js Equivalent
```
POST http://localhost:3000/api/auth/logout
```

#### Request Headers
```
Authorization: Bearer {token}
```

#### Response (Success - 200)
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### Implementation File
`src/app/api/auth/logout/route.ts`

---

## 👥 User Endpoints

### Get All Users

#### Current (Go Backend)
```
GET http://localhost:3000/api/users
Headers: Authorization: Bearer {token}
```

#### Next.js Equivalent
```
GET http://localhost:3000/api/users
Headers: Authorization: Bearer {token}
```

#### Query Parameters
```
?role=USER          # Filter by role
?page=1             # Pagination
?limit=10           # Items per page
?search=john        # Search by name/email
```

#### Response (200)
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER",
      "phone": "+1234567890",
      "isApproved": true,
      "createdAt": "2024-04-01T10:00:00Z"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 10
}
```

#### Implementation File
`src/app/api/users/route.ts`

---

### Get Single User

#### Current (Go Backend)
```
GET http://localhost:3000/api/users/{id}
Headers: Authorization: Bearer {token}
```

#### Next.js Equivalent
```
GET http://localhost:3000/api/users/[id]
Headers: Authorization: Bearer {token}
```

#### Response (200)
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER",
    "phone": "+1234567890",
    "isApproved": true,
    "createdAt": "2024-04-01T10:00:00Z",
    "updatedAt": "2024-04-02T10:00:00Z"
  }
}
```

#### Implementation File
`src/app/api/users/[id]/route.ts`

---

### Update User Profile

#### Current (Go Backend)
```
PUT http://localhost:3000/api/users/{id}
Headers: Authorization: Bearer {token}
Content-Type: application/json
```

#### Next.js Equivalent
```
PUT http://localhost:3000/api/users/[id]
Headers: Authorization: Bearer {token}
```

#### Request Body
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "+9876543210"
}
```

#### Response (200)
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "Jane",
    "lastName": "Smith",
    "phone": "+9876543210"
  }
}
```

#### Implementation File
`src/app/api/users/[id]/route.ts` (PUT method)

---

### Delete User

#### Current (Go Backend)
```
DELETE http://localhost:3000/api/users/{id}
Headers: Authorization: Bearer {token}
```

#### Next.js Equivalent
```
DELETE http://localhost:3000/api/users/[id]
Headers: Authorization: Bearer {token}
```

#### Response (200)
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

#### Implementation File
`src/app/api/users/[id]/route.ts` (DELETE method)

---

## 👨‍⚕️ Doctor Endpoints

### Create Doctor

#### Current (Go Backend)
```
POST http://localhost:3000/api/doctors
Headers: Authorization: Bearer {token}
```

#### Next.js Equivalent
```
POST http://localhost:3000/api/doctors
Headers: Authorization: Bearer {token}
```

#### Request Body
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "centerId": "507f1f77bcf86cd799439012",
  "specialization": "Addiction Medicine",
  "licenseNumber": "LIC-12345",
  "experience": 5,
  "bio": "Experienced addiction specialist"
}
```

#### Response (201)
```json
{
  "success": true,
  "message": "Doctor registered successfully",
  "data": {
    "id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "centerId": "507f1f77bcf86cd799439012",
    "specialization": "Addiction Medicine",
    "isApproved": false
  }
}
```

#### Implementation File
`src/app/api/doctors/route.ts` (POST method)

---

### Get All Doctors

#### Current (Go Backend)
```
GET http://localhost:3000/api/doctors
```

#### Next.js Equivalent
```
GET http://localhost:3000/api/doctors
```

#### Query Parameters
```
?centerId=507f1f77bcf86cd799439012    # Filter by center
?approved=true                        # Only approved doctors
?specialization=Addiction%20Medicine  # Filter by specialty
?page=1&limit=10                      # Pagination
```

#### Response (200)
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439013",
      "user": {
        "id": "507f1f77bcf86cd799439011",
        "firstName": "Dr. John",
        "lastName": "Smith",
        "email": "doctor@example.com"
      },
      "specialization": "Addiction Medicine",
      "experience": 5,
      "isApproved": true,
      "rating": 4.8
    }
  ],
  "total": 45,
  "page": 1
}
```

#### Implementation File
`src/app/api/doctors/route.ts` (GET method)

---

### Get Doctor Details

#### Current (Go Backend)
```
GET http://localhost:3000/api/doctors/{id}
```

#### Next.js Equivalent
```
GET http://localhost:3000/api/doctors/[id]
```

#### Response (200)
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439013",
    "user": {
      "firstName": "Dr. John",
      "lastName": "Smith",
      "email": "doctor@example.com",
      "phone": "+1234567890"
    },
    "center": {
      "id": "507f1f77bcf86cd799439012",
      "name": "Hope Rehabilitation Center"
    },
    "specialization": "Addiction Medicine",
    "experience": 5,
    "bio": "Experienced addiction specialist",
    "licenseNumber": "LIC-12345",
    "isApproved": true,
    "rating": 4.8,
    "reviews": 125
  }
}
```

#### Implementation File
`src/app/api/doctors/[id]/route.ts`

---

### Update Doctor Info

#### Current (Go Backend)
```
PUT http://localhost:3000/api/doctors/{id}
Headers: Authorization: Bearer {token}
```

#### Next.js Equivalent
```
PUT http://localhost:3000/api/doctors/[id]
Headers: Authorization: Bearer {token}
```

#### Request Body
```json
{
  "specialization": "Psychiatry & Addiction",
  "experience": 6,
  "bio": "Updated bio",
  "licenseNumber": "LIC-12346"
}
```

#### Response (200)
```json
{
  "success": true,
  "message": "Doctor information updated",
  "data": { ... }
}
```

#### Implementation File
`src/app/api/doctors/[id]/route.ts` (PUT method)

---

## 🏥 Center/NMK Endpoints

### Create Center

#### Current (Go Backend)
```
POST http://localhost:3000/api/centers
Headers: Authorization: Bearer {token}
```

#### Next.js Equivalent
```
POST http://localhost:3000/api/centers
Headers: Authorization: Bearer {token}
```

#### Request Body
```json
{
  "name": "Hope Rehabilitation Center",
  "address": "123 Main Street, City",
  "city": "City Name",
  "state": "State",
  "zipCode": "12345",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "phone": "+1234567890",
  "email": "info@center.com",
  "capacity": 50,
  "description": "Leading rehabilitation center",
  "adminId": "507f1f77bcf86cd799439014"
}
```

#### Response (201)
```json
{
  "success": true,
  "message": "Center registered successfully",
  "data": {
    "id": "507f1f77bcf86cd799439015",
    "name": "Hope Rehabilitation Center",
    "isApproved": false
  }
}
```

#### Implementation File
`src/app/api/centers/route.ts` (POST method)

---

### Get All Centers

#### Current (Go Backend)
```
GET http://localhost:3000/api/centers
```

#### Next.js Equivalent
```
GET http://localhost:3000/api/centers
```

#### Query Parameters
```
?city=New%20York
?state=NY
?approved=true
?lat=40.7128&lng=-74.0060&radius=5km   # Geo search
?page=1&limit=10
```

#### Response (200)
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439015",
      "name": "Hope Rehabilitation Center",
      "city": "City Name",
      "state": "State",
      "phone": "+1234567890",
      "capacity": 50,
      "doctorCount": 5,
      "rating": 4.6,
      "distance": "2.5 km",
      "isApproved": true
    }
  ],
  "total": 82,
  "page": 1
}
```

#### Implementation File
`src/app/api/centers/route.ts` (GET method)

---

### Search Centers (Geo-location based)

#### Current (Go Backend)
```
GET http://localhost:3000/api/centers/search
```

#### Next.js Equivalent
```
GET http://localhost:3000/api/centers/search
```

#### Query Parameters
```
?latitude=40.7128
?longitude=-74.0060
?radius=5            # in km
```

#### Response (200)
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439015",
      "name": "Hope Rehabilitation Center",
      "distance": "1.2 km",
      "rating": 4.6,
      "doctors": 5
    },
    {
      "id": "507f1f77bcf86cd799439016",
      "name": "Healing Haven Center",
      "distance": "2.8 km",
      "rating": 4.4,
      "doctors": 3
    }
  ]
}
```

#### Implementation File
`src/app/api/centers/search/route.ts`

---

### Get Center Details

#### Current (Go Backend)
```
GET http://localhost:3000/api/centers/{id}
```

#### Next.js Equivalent
```
GET http://localhost:3000/api/centers/[id]
```

#### Response (200)
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439015",
    "name": "Hope Rehabilitation Center",
    "address": "123 Main Street",
    "phone": "+1234567890",
    "email": "info@center.com",
    "capacity": 50,
    "currentOccupancy": 35,
    "description": "Leading rehabilitation center",
    "doctors": [
      {
        "id": "507f1f77bcf86cd799439013",
        "name": "Dr. John Smith",
        "specialization": "Addiction Medicine"
      }
    ],
    "amenities": ["Counseling", "Therapy", "Medication"],
    "rating": 4.6,
    "reviews": 89,
    "isApproved": true
  }
}
```

#### Implementation File
`src/app/api/centers/[id]/route.ts`

---

## 🏥 Home Remedies Endpoints

### Get Home Remedies

#### Current (Go Backend)
```
GET http://localhost:3000/api/home-remedies
```

#### Next.js Equivalent
```
GET http://localhost:3000/api/home-remedies
```

#### Query Parameters
```
?category=anxiety          # Filter by condition
?page=1&limit=12          # Pagination
```

#### Response (200)
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439020",
      "title": "Meditation for Anxiety Relief",
      "description": "Simple meditation techniques",
      "category": "anxiety",
      "ingredients": ["Quiet space", "Comfortable position"],
      "instructions": [
        "Find a quiet place",
        "Sit comfortably",
        "Focus on breathing"
      ]
    }
  ],
  "total": 45,
  "page": 1
}
```

#### Implementation File
`src/app/api/home-remedies/route.ts`

---

## ⚕️ Health Check Endpoint

### Health Status

#### Current (Go Backend)
```
GET http://localhost:3000/api/health
```

#### Next.js Equivalent
```
GET http://localhost:3000/api/health
```

#### Response (200)
```json
{
  "status": "ok",
  "timestamp": "2024-04-03T10:30:00.000Z",
  "uptime": 3600,
  "environment": "development",
  "database": "connected"
}
```

#### Response (503 - If database fails)
```json
{
  "status": "error",
  "message": "Database connection failed"
}
```

#### Implementation File
`src/app/api/health/route.ts`

---

## 📊 File Structure Summary

```
src/app/api/
├── health/
│   └── route.ts                    # GET /api/health
├── auth/
│   ├── signup/route.ts             # POST /api/auth/signup
│   ├── signin/route.ts             # POST /api/auth/signin
│   └── logout/route.ts             # POST /api/auth/logout
├── users/
│   ├── route.ts                    # GET, POST /api/users
│   └── [id]/
│       └── route.ts                # GET, PUT, DELETE /api/users/[id]
├── doctors/
│   ├── route.ts                    # GET, POST /api/doctors
│   ├── [id]/route.ts               # GET, PUT, DELETE /api/doctors/[id]
│   └── search/route.ts             # GET /api/doctors/search
├── centers/
│   ├── route.ts                    # GET, POST /api/centers
│   ├── [id]/route.ts               # GET, PUT /api/centers/[id]
│   └── search/route.ts             # GET /api/centers/search
└── home-remedies/
    └── route.ts                    # GET /api/home-remedies
```

---

## 🧪 Testing Command Examples

### Test Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "SecurePass123",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER"
  }'
```

### Test Signin
```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "SecurePass123"
  }'
```

### Test Protected Endpoint (Get Users)
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer {token_from_signin}"
```

### Test Center Search
```bash
curl -X GET "http://localhost:3000/api/centers/search?latitude=40.7128&longitude=-74.0060&radius=5"
```

---

## 📝 Migration Checklist

- [ ] Auth endpoints implemented and tested
- [ ] User endpoints implemented and tested
- [ ] Doctor endpoints implemented and tested
- [ ] Center endpoints implemented and tested
- [ ] Home remedies endpoint implemented
- [ ] Health check endpoint working
- [ ] All error responses consistent
- [ ] Token validation working
- [ ] Rate limiting in place
- [ ] CORS configured
- [ ] Documentation updated

---

## 🔄 Response Format Standard

All endpoints should follow this format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "timestamp": "2024-04-03T10:30:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2024-04-03T10:30:00Z"
}
```

---

## ⚠️ Important Notes

1. **CORS**: Ensure CORS is configured to allow frontend requests
2. **Rate Limiting**: Implement rate limiting for public endpoints
3. **Validation**: Always validate input data using Zod
4. **Error Handling**: Return consistent error messages
5. **Authentication**: Protect all non-public endpoints
6. **Logging**: Log all API calls for debugging
7. **Testing**: Test each endpoint before marking as complete

---

**Document Version**: 1.0
**Created**: April 2026
**Total Endpoints**: 25+
