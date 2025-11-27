# Healthcare Management System

A comprehensive healthcare appointment management system with separate frontend (React) and backend (Spring Boot) applications.

## Project Structure

```
healthcare-system/
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── backend/           # Spring Boot backend
│   ├── src/
│   ├── pom.xml
│   └── README.md
└── README.md         # This file
```

## Quick Start

### Backend Setup (Spring Boot + MySQL)

1. **Database Setup**:
   ```sql
   CREATE DATABASE health;
   ```

2. **Navigate to backend**:
   ```bash
   cd backend
   ```

3. **Run the application**:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   Backend will run on: `http://localhost:9096/myapp`

### Frontend Setup (React + TypeScript)

1. **Navigate to frontend**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

   Frontend will run on: `http://localhost:5173`

## Features

### Multi-Role System
- **Patients**: Book appointments, view medical records
- **Doctors**: Manage patient records, view appointments  
- **Administrators**: System management and oversight

### Core Functionality
- User authentication with JWT tokens
- Appointment scheduling and management
- Medical records management
- Real-time dashboard statistics
- Role-based access control

## Tech Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS + Shadcn/ui
- React Router + React Query
- Vite build tool

### Backend  
- Spring Boot 3
- Spring Security + JWT
- MySQL Database
- Maven build tool

## Database Configuration

The system uses MySQL with the following configuration:
- Database: `health`
- Port: `3306`
- Username/Password: `root/root`

## API Endpoints

- **Authentication**: `/auth/login`, `/auth/register`
- **Appointments**: `/appointments/*`
- **Medical Records**: `/medical-records/*`
- **Users**: `/users/*`
- **Dashboard**: `/dashboard/stats`

## Development

### Adding New Features
1. Backend: Add controllers, services, and repositories in Spring Boot
2. Frontend: Create components and pages in React
3. Update API service layer to connect frontend with backend

### Database Schema
- `users` - User accounts (patients, doctors, admins)  
- `appointments` - Appointment bookings and scheduling
- `medical_records` - Patient medical history
- `medicines` - Medication records

## Deployment

### Frontend
```bash
cd frontend
npm run build
# Deploy dist/ folder to web server
```

### Backend  
```bash
cd backend
mvn clean package
# Deploy target/*.jar to server
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes in appropriate frontend/backend folder
4. Test thoroughly
5. Submit pull request

## License

This project is licensed under the MIT License.