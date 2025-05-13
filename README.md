# SHMS - Smart Hotel Management System (Frontend)

This is the frontend application for the Smart Hotel Management System, built with React and Tailwind CSS.

## Features

- 🔐 User Authentication & Authorization
  - JWT-based authentication
  - Role-based access control (Admin, Hotel Manager, Guest)
  - Protected routes

- 👥 User Management
  - User registration and login
  - Profile management
  - Role-based dashboards

- 🏨 Hotel Management
  - Create and manage hotels
  - Room management
  - Pricing and availability

- 📅 Booking System
  - Search hotels and rooms
  - Make reservations
  - View booking history

- ⭐ Reviews & Ratings
  - Submit reviews and ratings
  - View and respond to feedback

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Backend API running (ASP.NET Core)

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Testing the Application

1. Register a new user (Guest, Hotel Manager)
2. Login with your credentials
3. Based on your role, you'll see different dashboards:
   - **Guest**: Browse hotels, make bookings, view your bookings
   - **Hotel Manager**: Create and manage hotels, add rooms, view bookings
   - **Admin**: Manage users, hotels, and view system statistics

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React context providers
├── hooks/          # Custom React hooks
├── layouts/        # Page layout components
├── pages/          # Page components
│   ├── Login/      # Login page
│   ├── Register/   # Registration page
│   ├── GuestDashboard/    # Guest user dashboard
│   ├── HotelManagerDashboard/  # Hotel manager dashboard
│   ├── AdminDashboard/    # Admin dashboard
│   └── Unauthorized/      # Access denied page
├── services/       # API service functions
└── utils/          # Utility functions
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Technologies Used

- React 18
- React Router v6
- Tailwind CSS
- Headless UI
- Heroicons
- Axios

## Connecting to Backend

This frontend is designed to connect to the ASP.NET Core backend API. Make sure the backend API is running and accessible at the URL specified in your .env file (default: http://localhost:5000/api).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
