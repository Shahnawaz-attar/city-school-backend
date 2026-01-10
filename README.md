# City School Management System - Backend API

Enterprise-grade RESTful API for the City School Management System built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (Atlas)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, bcryptjs
- **Validation**: Express Validator
- **Logging**: Morgan

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Create .env file (see Environment Variables section)
cp .env.example .env

# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRE=30d
COOKIE_EXPIRE=30
FRONTEND_URL=http://localhost:3000
```

### Production Environment Variables (Render)
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-production-secret
JWT_EXPIRE=30d
COOKIE_EXPIRE=30
FRONTEND_URL=https://your-frontend.vercel.app
```

## 📁 Project Structure

```
city-school-backend/
├── src/
│   ├── config/          # Configuration files (DB, etc.)
│   ├── controllers/     # Route controllers (v1, v2, etc.)
│   ├── middleware/      # Express middleware (auth, error, etc.)
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes (versioned)
│   ├── scripts/         # Utility scripts (seed, etc.)
│   ├── utils/           # Utility functions
│   └── server.ts        # Entry point
├── dist/                # Compiled JavaScript (gitignored)
├── .env                 # Environment variables (gitignored)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🔌 API Endpoints

### Authentication (`/api/v1/auth`)
```
POST   /register        - Register new user
POST   /login           - Login user
GET    /logout          - Logout user
PUT    /updatedetails   - Update user details (Protected)
PUT    /updatepassword  - Update password (Protected)
```

### Future Routes (To be implemented)
- `/api/v1/schools` - School management
- `/api/v1/users` - User management
- `/api/v1/students` - Student records
- `/api/v1/teachers` - Teacher records
- `/api/v1/courses` - Course management

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs with salt rounds
- **HTTP-only Cookies**: Prevents XSS attacks
- **CORS**: Configured for specific frontend origin
- **Helmet**: Security headers
- **Input Validation**: Request validation and sanitization
- **Error Handling**: Centralized error handler

## 🧪 Scripts

```bash
# Development
npm run dev              # Start with nodemon (hot reload)

# Production
npm run build            # Compile TypeScript to JavaScript
npm start                # Run compiled code

# Database
npm run seed             # Seed super admin user
```

## 🗄️ Database Seeding

Create a super admin user:

```bash
npm run seed
```

Default credentials:
- Email: `admin@cityschool.com`
- Password: `Admin@123456`
- Role: `super-admin`

⚠️ **Important**: Change the password immediately after first login in production!

## 🚀 Deployment

### Deploy to Render

1. Push code to GitHub
2. Connect repository to Render
3. Configure as Web Service
4. Set environment variables
5. Deploy!

See [deployment-guide.md](../deployment-guide.md) for detailed instructions.

## 🐛 Error Handling

The API uses a centralized error handling middleware that returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

## 📝 API Versioning

This API uses URL versioning (e.g., `/api/v1/...`). Future versions will be added as `/api/v2/...` etc.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

Private - All rights reserved

## 👨‍💻 Developer

**Shahnawaz**
- City School Management System
- Enterprise-level school management platform

## 🔗 Related Repositories

- Frontend: [City_School](../City_School)

## 📞 Support

For issues and questions, please create an issue in this repository.

---

**Built with ❤️ for modern education management**
