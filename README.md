
## 📋 Project Overview & Purpose

**Purple Merit** is a full-stack user management dashboard for administrators to manage users with role-based access control. Features include user authentication, admin dashboard with pagination, and user status toggling (activate/deactivate).

**Purpose**: Secure user management system for organizations with admin/user role separation, built for scalability and production deployment.

## 🛠️ Tech Stack

### Frontend
- React 18 + Vite (Build Tool)
- Tailwind CSS 3.4 (Styling)
- React Router DOM (Routing)
- Axios (API Client)
- React Hot Toast (Notifications)

### Backend
- Node.js + Express 5.2 (API)
- MongoDB + Mongoose 9.1 (Database)
- JWT + bcryptjs (Authentication)
- Joi (Validation)
- CORS (Cross-Origin)

### Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

## 🚀 Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/purple-merit.git
cd purple-merit
```

### 2. Backend Setup (server/)
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```
**Backend runs on**: `http://localhost:5000`

### 3. Frontend Setup (client/)
```bash
cd ../client
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```
**Frontend runs on**: `http://localhost:5173`

## 🔑 Environment Variables

### Backend .env (server/.env)
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=1d
```

### Frontend .env (client/.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🌐 Live Deployment Links

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | https://purple-merit.vercel.app | ✅ Live |
| **Backend API** | https://mini-user-management-system-d2k8.onrender.com | ✅ Live |
| **Database** | MongoDB Atlas | ✅ Cloud |

## 📡 API Documentation

### Base URL
- Production: `https://mini-user-management-system-d2k8.onrender.com/api`
- Local: `http://localhost:5000/api`

### Authentication Endpoints

#### POST /api/users/login
**Request**:
```json
{
  "email": "admin@gmail.com",
  "password": "password123"
}
```

**Response** (200 OK):
```json
{
  "data": {
    "user": {
      "email": "admin@gmail.com",
      "role": "admin",
      "status": "active"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### POST /api/users/signup
**Request**:
```json
{
  "email": "newuser@gmail.com",
  "fullName": "John Doe",
  "password": "password123"
}
```

**Response** (201 Created):
```json
{
  "data": {
    "user": {
      "email": "newuser@gmail.com",
      "fullName": "John Doe",
      "role": "user",
      "status": "active"
    }
  }
}
```

### Admin Endpoints

#### GET /api/admin/users?page=1
**Headers**: `Authorization: Bearer {token}`

**Response** (200 OK):
```json
{
  "data": [
    {
      "users": [
        {
          "_id": "64f...abc",
          "email": "user@example.com",
          "fullName": "John Doe",
          "role": "user",
          "status": "active"
        }
      ]
    }
  ]
}
```

#### POST /api/admin/users/:id/activate
**Headers**: `Authorization: Bearer {token}`

**Response** (200 OK):
```json
{
  "success": true,
  "message": "User activated successfully"
}
```

#### POST /api/admin/users/:id/deactivate
**Headers**: `Authorization: Bearer {token}`

**Response** (200 OK):
```json
{
  "success": true,
  "message": "User deactivated successfully"
}
```

## ☁️ Deployment Instructions

### Backend Deployment (Render)
1. Visit **render.com** and sign in with GitHub
2. Click **New → Web Service**
3. Connect your GitHub repository
4. Configure settings:
   - **Root Directory**: `server/`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Runtime**: Node
5. Add Environment Variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=1d
   ```
6. Click **Deploy**
7. Get your backend URL: `https://your-app-name.onrender.com`

### Frontend Deployment (Vercel)
1. Visit **vercel.com** and sign in with GitHub
2. Click **Import Project**
3. Select your GitHub repository
4. Configure settings:
   - **Framework**: Vite
   - **Root Directory**: `client/`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```
6. Click **Deploy**
7. Get your frontend URL: `https://your-app.vercel.app`

## 🎯 Features Delivered

✅ **User Authentication** - Login/Signup with JWT security
✅ **Role-Based Access** - Admin/User role separation with protected routes
✅ **Admin Dashboard** - Paginated users table with sorting
✅ **User Status Management** - Activate/Deactivate users with real-time updates
✅ **Responsive UI** - Tailwind CSS with mobile-first design
✅ **Production Deployment** - Vercel (Frontend) + Render (Backend) + MongoDB Atlas
✅ **Environment Security** - .env files with .gitignore protection
✅ **API Error Handling** - Proper HTTP status codes and error messages
✅ **Loading States** - Spinners and disabled buttons during operations
✅ **Form Validation** - Client-side and server-side validation with Joi

## 📂 Repository Structure

```
purple-merit/
├── client/                      # React + Vite + Tailwind Frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js        # Axios instance with interceptors
│   │   ├── auth/
│   │   │   └── AuthContext.js  # Authentication context
│   │   ├── pages/
│   │   │   ├── Login.jsx       # Login page
│   │   │   ├── Signup.jsx      # Signup page
│   │   │   ├── AdminDashboard.jsx # Admin users table
│   │   │   └── Profile.jsx     # User profile
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx # Route protection
│   │   ├── App.jsx             # Main app with routing
│   │   └── main.jsx            # Entry point
│   ├── .env                    # Environment variables
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
├── server/                      # Node.js + Express Backend
│   ├── models/
│   │   └── User.js             # User schema
│   ├── routes/
│   │   ├── users.js            # Auth routes
│   │   └── admin.js            # Admin routes
│   ├── middleware/
│   │   └── auth.js             # JWT verification
│   ├── .env                    # Environment variables
│   ├── index.js                # Main server file
│   └── package.json
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🧪 Local Testing Flow

```
Step 1: Start Backend
$ cd server
$ npm run dev
→ http://localhost:5000 (Connected to MongoDB)

Step 2: Start Frontend
$ cd ../client
$ npm run dev
→ http://localhost:5173

Step 3: Test Login
- Navigate to http://localhost:5173/login
- Enter: admin@gmail.com / yourpassword
- Redirects to Admin Dashboard

Step 4: Test Admin Features
- View paginated users table
- Click "Deactivate" button
- User status changes in real-time
- Refresh page → changes persist in DB
```

## 🔒 Security Features

- JWT tokens stored in localStorage
- Password hashing with bcryptjs
- CORS protection
- Request validation with Joi
- Protected routes with role-based access
- Environment variables for sensitive data

## 📱 Responsive Design

- Mobile-first approach with Tailwind CSS
- Desktop: Full-width table with sidebar navigation
- Tablet: Optimized card layouts
- Mobile: Vertical stacking with touch-friendly buttons

## 🚨 Troubleshooting

### Backend won't start
- Check MongoDB connection string in .env
- Verify PORT 5000 is not in use
- Run `npm install` again if modules missing

### Frontend won't connect to backend
- Verify `VITE_API_URL` in .env matches backend URL
- Check network tab in browser DevTools
- Ensure backend is running on correct port

### Tailwind styles not showing
- Run `npm run build` in client/
- Clear browser cache
- Verify `src/index.css` has @tailwind directives
- Check `tailwind.config.js` content paths

---

