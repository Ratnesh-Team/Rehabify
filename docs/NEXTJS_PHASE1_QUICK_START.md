# 🚀 Next.js Migration - Quick Start Guide

**Phase 1: Foundation (Weeks 1-2)**
**Get started immediately with these commands**

---

## ⚡ Quick Setup (15 minutes)

### Step 1: Create Next.js Project

```bash
# Navigate to your workspace
cd /Users/rk/Documents/GitHub

# Create Next.js project
npx create-next-app@latest rehabify-next \
  --typescript \
  --tailwind \
  --app-router \
  --src-dir \
  --import-alias "@/*" \
  --no-git

# Navigate to project
cd rehabify-next
```

### Step 2: Install Essential Dependencies

```bash
# Core dependencies for backend
npm install axios dotenv mongoose jose bcryptjs

# Additional utilities
npm install zod clsx date-fns

# State management
npm install zustand

# Development dependencies
npm install -D @types/node @types/mongoose @types/bcryptjs
npm install -D eslint-config-next eslint-plugin-react-hooks
```

### Step 3: Setup Environment Variables

Create `.env.local`:

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rehabify

# Authentication
JWT_SECRET=your-super-secret-jwt-key-generate-with-openssl-rand-base64-32
SALT=E_SALA_CUP_NAMDE

# Server
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Rehabify
NODE_ENV=development

# Optional
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

### Step 4: Create Directory Structure

```bash
# Create directories
mkdir -p src/{app/api/{auth,users,doctors,centers,health},lib,models,middleware,services,store,types,utils}

# Core directories already exist from Next.js setup
# - src/components
# - src/app
# - src/public
```

---

## 🏗️ File Creation Checklist

### Create `src/lib/db.ts` - Database Connection

```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable');
}

interface CachedConnection {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
}

let cached: CachedConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB(): Promise<mongoose.Mongoose> {
  if (cached.conn) {
    console.log('Using cached DB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log('Connected to MongoDB');
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
```

### Create `src/lib/jwt.ts` - JWT Utilities

```typescript
import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
);

export async function sign(payload: any): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verify(token: string): Promise<any> {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload;
  } catch (err) {
    return null;
  }
}
```

### Create `src/lib/validation.ts` - Zod Schemas

```typescript
import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  role: z.enum(['USER', 'DOCTOR', 'ADMIN']).default('USER'),
  phone: z.string().optional(),
});

export const signinSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Invalid password'),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
```

### Create `src/models/User.ts` - Mongoose Schema

```typescript
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'DOCTOR' | 'ADMIN' | 'SUPER_ADMIN';
  phone?: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['USER', 'DOCTOR', 'ADMIN', 'SUPER_ADMIN'],
      default: 'USER',
    },
    phone: String,
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);
```

### Create Similar Models

Create `src/models/Doctor.ts`, `src/models/Center.ts`, `src/models/HomeRemedy.ts`

```typescript
// Follow same pattern as User.ts
```

### Create `src/app/api/health/route.ts` - Health Check

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Database connection failed',
      },
      { status: 503 }
    );
  }
}
```

### Create `src/app/api/auth/signup/route.ts` - Signup Endpoint

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { signupSchema } from '@/lib/validation';
import bcrypt from 'bcryptjs';
import { sign } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validated = signupSchema.parse(body);

    // Connect to DB
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email: validated.email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validated.password, 10);

    // Create user
    const user = await User.create({
      ...validated,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = await sign({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Return response
    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        token,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Create `src/app/api/auth/signin/route.ts` - Signin Endpoint

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { signinSchema } from '@/lib/validation';
import bcrypt from 'bcryptjs';
import { sign } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validated = signinSchema.parse(body);

    // Connect to DB
    await connectDB();

    // Find user
    const user = await User.findOne({ email: validated.email });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      validated.password,
      user.password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = await sign({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Signin error:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Create `src/middleware.ts` - Auth Middleware

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verify } from '@/lib/jwt';

export async function middleware(req: NextRequest) {
  // Get token from header
  const token = req.headers
    .get('authorization')
    ?.split(' ')[1];

  // Public routes that don't need auth
  const publicRoutes = [
    '/api/auth/signin',
    '/api/auth/signup',
    '/api/health',
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If no token, return unauthorized
  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Verify token
  const payload = await verify(token);
  if (!payload) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }

  // Add user to request (for later use)
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-user-id', payload.id);
  requestHeaders.set('x-user-role', payload.role);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
  ],
};
```

### Create `src/store/auth.ts` - Zustand Store

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  firstName: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-store',
    }
  )
);
```

---

## ✅ Verification Tests

### Test 1: Database Connection

```bash
curl http://localhost:3000/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-04-03T10:30:00.000Z",
  "uptime": 12.345,
  "environment": "development"
}
```

### Test 2: Create User (Signup)

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "TestPass123",
    "firstName": "Test",
    "lastName": "User",
    "role": "USER"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "testuser@example.com",
    "firstName": "Test",
    "role": "USER"
  }
}
```

### Test 3: Login (Signin)

```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "TestPass123"
  }'
```

---

## 🎯 Running the Application

### Development Mode

```bash
# Start development server
npm run dev

# Application runs at http://localhost:3000
# API at http://localhost:3000/api/*
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 📋 Daily Checklist (Week 1-2)

### Day 1
- [ ] Create Next.js project
- [ ] Install dependencies
- [ ] Setup environment variables
- [ ] Create directory structure
- Deploy to branch: `phase-1-setup`

### Day 2-3
- [ ] Create database connection file
- [ ] Create JWT utilities
- [ ] Create Zod validation schemas
- [ ] Test database connection
- Deploy to branch: `phase-1-database`

### Day 4-5
- [ ] Create User model
- [ ] Create other models (Doctor, Center, etc.)
- [ ] Test model creation
- [ ] Setup MongoDB indexes
- Deploy to branch: `phase-1-models`

### Day 6-7
- [ ] Create health check endpoint
- [ ] Create signup endpoint
- [ ] Create signin endpoint
- [ ] Test authentication endpoints
- Deploy to branch: `phase-1-auth`

### Day 8-10
- [ ] Create Zustand store
- [ ] Create middleware
- [ ] Test protected routes
- [ ] Error handling
- Deploy to branch: `phase-1-middleware`

### Day 11-14
- [ ] Integration testing
- [ ] Documentation
- [ ] Code review
- [ ] Staging deployment test
- Deploy to branch: `phase-1-complete`

---

## 🚨 Troubleshooting

### MongoDB Connection Error
```
Error: Please define MONGODB_URI environment variable
```
**Fix**: Add `MONGODB_URI` to `.env.local`

### JWT Secret Error
```
Error: JWT_SECRET not configured
```
**Fix**: Add `JWT_SECRET` to `.env.local` (generate with `openssl rand -base64 32`)

### Bcrypt Installation Error
```
gyp ERR! build error
```
**Fix**:
```bash
npm install --save-optional bcryptjs
# or use pure JS version
npm install bcryptjs --force
```

---

## 📚 Next Resources

After completing Phase 1:
1. Read the full `NEXTJS_MIGRATION_PLAN.md`
2. Start Phase 2: Database Models Migration
3. Review API routes structure
4. Plan Phase 3: Full API Implementation

---

## 🎉 Success!

Once you see this output, Phase 1 is complete:

```
> next dev
  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.1s
```

And database health check returns `"status": "ok"`

---

**Document Version**: 1.0
**Created**: April 2026
**Estimated Completion**: 2 weeks
