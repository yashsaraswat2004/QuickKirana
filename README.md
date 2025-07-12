# 🛍️ Quick Kirana - Time-Saving Grocery Marketplace

A modern platform that saves customers time by eliminating trips to kirana stores just to submit grocery lists. Submit from home, get called when ready, and choose pickup or delivery!

## 🎯 Key Features

- **⏰ Time-Saving**: No more trips to submit grocery lists
- **🏠 Submit from Home**: Upload or type your list from comfort of home
- **📞 Get Called**: Receive notification when order is ready
- **🚚 Flexible Options**: Choose pickup (free) or delivery (paid)
- **⚡ Urgent Priority**: Same-day service with advance payment
- **🏪 Local Support**: Help neighborhood kirana stores thrive

## 🏗️ Project Structure

```
QuickKirana/
├── frontend/          # React + Vite + TypeScript
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── backend/           # Node.js + Express + MongoDB
│   ├── src/
│   ├── package.json
│   └── index.js
├── package.json       # Root package.json for monorepo
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- MongoDB database
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yashsaraswat2004/QuickKirana.git
cd QuickKirana

# Install all dependencies (root, frontend, backend)
npm run install:all

# Start development servers (both frontend and backend)
npm run dev
```

### Individual Commands

```bash
# Frontend only (http://localhost:5173)
npm run dev:frontend

# Backend only (http://localhost:3000)
npm run dev:backend

# Build for production
npm run build

# Start production servers
npm start
```

## 🌐 Deployment

### 🎨 Frontend Deployment (Vercel/Netlify)

**For Vercel:**
1. Connect your GitHub repository
2. Set build settings:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

**For Netlify:**
1. Connect your GitHub repository
2. Set build settings:
   - **Base Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `frontend/dist`

### 🔧 Backend Deployment (Render/Railway)

**For Render:**
1. Connect your GitHub repository
2. Create a new Web Service
3. Set build settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node.js

**For Railway:**
1. Connect your GitHub repository
2. Select the backend service
3. Set root directory to `backend`
4. Railway will auto-detect Node.js and package.json

### 📱 Full-Stack Deployment (Render)

**Option 1: Separate Services**
- Deploy frontend and backend as separate services
- Update API endpoints in frontend to point to backend URL

**Option 2: Single Service (Backend + Static Frontend)**
- Build frontend and serve from backend
- More complex but single deployment

## 🔧 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Quick Kirana
```

### Backend (.env)
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=https://your-frontend-domain.com
```

## 🛠️ Development Scripts

```bash
# Development
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Start only frontend
npm run dev:backend      # Start only backend

# Building
npm run build           # Build both frontend and backend
npm run build:frontend  # Build only frontend
npm run build:backend   # Build only backend

# Production
npm start              # Start backend server
npm run start:frontend # Start frontend preview

# Utilities
npm run clean          # Remove all node_modules
npm run clean:build    # Remove all build outputs
npm run lint           # Run linting
```

## 📊 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Security**: bcrypt, helmet, cors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Yash Saraswat**
- GitHub: [@yashsaraswat2004](https://github.com/yashsaraswat2004)

## 🙏 Acknowledgments

- Thanks to all the local kirana store owners who inspired this project
- Built with modern web technologies for optimal user experience
- Designed to support local businesses while saving customer time

---

**⭐ If you found this project helpful, please give it a star!**
