# Serasa Agro - Rural Producer Management System

A full-stack application for managing rural producers and their properties, built with React + TypeScript frontend and NestJS + PostgreSQL backend.

## Features

- **Producer Management**: CRUD operations for rural producers with CPF/CNPJ validation
- **Property Management**: Manage farm properties with area validation
- **Harvest & Culture Tracking**: Track harvests and cultures planted per property
- **Dashboard**: Visual analytics with charts showing:
  - Total farms and hectares
  - Farms by state distribution
  - Culture types distribution
  - Land use (cultivable vs vegetation)

## Tech Stack

### Backend
- NestJS with TypeScript
- PostgreSQL with TypeORM
- Class Validator for data validation
- Swagger/OpenAPI documentation
- Jest for testing

### Frontend
- React 18 with TypeScript
- Redux Toolkit for state management
- Styled Components for styling
- Recharts for data visualization
- React Hook Form with Yup validation
- Atomic Design pattern
- Jest + React Testing Library for testing

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)

### Running with Docker

1. Clone the repository
2. Run the application:

```bash
docker compose up --build
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- API Documentation: http://localhost:3000/api
- PostgreSQL: localhost:5432

**Note**: The database will be automatically populated with sample data on first run to demonstrate the dashboard functionality.

### Local Development

#### Backend Setup
```bash
cd backend
npm install
npm run start:dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Documentation

Once the backend is running, access the Swagger documentation at:
http://localhost:3000/api

## Testing

### Backend Tests
```bash
cd backend
npm run test          # Unit tests
npm run test:e2e      # Integration tests
npm run test:cov      # Coverage report
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## Database Schema

The application uses a normalized PostgreSQL schema with the following entities:

- **Producers**: CPF/CNPJ, name
- **Properties**: Farm details, location, areas
- **Harvests**: Year, season per property
- **Cultures**: Culture type, planted area per harvest

## Validation Rules

- CPF/CNPJ validation using official algorithms
- Area validation: cultivable + vegetation ≤ total area
- All required fields validated on both frontend and backend

## Architecture

### Backend
- Modular architecture with separate modules for each entity
- Service layer for business logic
- Repository pattern with TypeORM
- DTO classes for API contracts
- Custom validators for business rules

### Frontend
- Atomic Design pattern
- Redux for global state management
- Custom hooks for API calls
- Responsive design with styled-components
- Form validation with real-time feedback
