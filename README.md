# Task Management System

A full-stack task management application built with modern web technologies.

## 🛠️ Technologies Used

### Frontend
- **Vite** (Latest) - Fast build tool and development server
- **React** - UI library for building user interfaces
- **Bootstrap 5** - CSS framework for responsive design
- **Redux Toolkit (RTK)** - State management with RTK Query for API calls

### Backend
- **.NET 9** - Modern web API framework
- **PostgreSQL** - Relational database
- **JWT Authentication** - Secure token-based authentication
- **Entity Framework Core** - ORM for database operations

## Setup Instructions

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)

### 1. Database Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-management-system
   ```

2. Start the PostgreSQL database using Docker:
   ```bash
   docker-compose up --build
   ```

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit [http://localhost:5173](http://localhost:5173)

### 3. Backend Setup

> **Note:** All required configuration values are available in `settings.Development.json`

1. Navigate to the backend directory:
   ```bash
   cd backend/backend
   ```

2. Restore NuGet packages:
   ```bash
   dotnet restore
   ```

3. Build the project:
   ```bash
   dotnet build
   ```

4. Setup the PostgreSQL UUID extension (required before running migrations):
   ```bash
   docker exec -it TMS.DB psql -U postgres -d TMSDev
   ```

   Then run this SQL command:
   ```sql
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   ```

   Exit with `\q`

5. Apply database migrations:
   ```bash
   dotnet ef database update
   ```

6. Start the backend server:
   ```bash
   dotnet run
   ```

## Getting Started

Once all services are running:

1. Visit [http://localhost:5173](http://localhost:5173) to access the application
2. Create an account or log in with existing credentials
3. Start managing your tasks!

## Project Structure

```
task-management-system/
├── frontend/          # React + Vite frontend
├── backend/           # .NET 9 Web API
├── docker-compose.yml # Database configuration
└── README.md
```

## Development

- **Frontend**: Runs on `http://localhost:5173`
- **Backend API**: Runs on `https://localhost:7xxx` (check console output)
- **Database**: PostgreSQL on `localhost:5432`

## Features

- User authentication with JWT tokens
- Create, read, update, and _delete(incomplete)_ tasks
- Task assignment and status management
- Responsive design with Bootstrap 5
- Real-time state management with Redux Toolkit