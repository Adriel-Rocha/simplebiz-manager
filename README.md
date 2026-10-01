# SimpleBiz Manager

## A practical business management system for small businesses

SimpleBiz Manager is a full-stack business management application designed to centralize customer and product operations in a simple, secure and maintainable system.

This project is a **portfolio demonstration based on common real-world business needs**. It is not presented as a system currently used by a real client.

## Business Problem

Small businesses often rely on spreadsheets, disconnected tools and manual processes to manage customers and products.

SimpleBiz demonstrates how these operations can be centralized in a web application with:

- secure authentication
- user roles and permissions
- customer management
- product management
- data validation
- pagination and sorting
- documented REST APIs
- responsive frontend

## Solution

The application provides a centralized interface where authorized users can manage business information through a web dashboard backed by a secure REST API.

### Main flow

```text
User
  ↓
Authentication
  ↓
Role & Permission Check
  ↓
Business Dashboard
  ↓
Customers / Products
  ↓
REST API
  ↓
Database
```

## Main Features

### Authentication & Authorization

- JWT authentication
- Spring Security
- Role-based access
- ADMIN and USER roles
- Protected endpoints

### Customer Management

- Create customers
- List customers
- Update customers
- Delete customers
- Validation
- Pagination
- Sorting

### Product Management

- Create products
- List products
- Update products
- Delete products
- Validation
- Pagination
- Sorting

### API Documentation

The REST API is documented with OpenAPI/Swagger, making the system easier to understand, test and integrate.

## Technology Stack

### Backend

- Java 17
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- Hibernate
- Bean Validation
- OpenAPI / Swagger

### Frontend

- React
- Axios
- React Router
- Responsive UI

### Database

- MySQL

### Development

- Maven
- Git
- Docker-ready architecture

## Architecture

```text
┌──────────────────────┐
│      React App       │
│      Frontend        │
└──────────┬───────────┘
           │ HTTP / JSON
           ▼
┌──────────────────────┐
│    Spring Boot API   │
│                      │
│  Security / JWT      │
│  Controllers         │
│  Services            │
│  Repositories        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│        MySQL         │
└──────────────────────┘
```

## Project Status

This is an evolving demonstration project.

The current version focuses on the core business-management workflow. Future iterations may include dashboards, reporting, audit history, additional business entities and deployment improvements.

## Screenshots

Screenshots will be added as the interface is refined.

## Running Locally

### Backend

Clone the repository:

```bash
git clone https://github.com/Adriel-Rocha/simplebiz-manager.git
cd simplebiz-manager
```

Configure your MySQL connection in the application configuration.

Then run:

```bash
./mvnw spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## API

After starting the backend, Swagger/OpenAPI is available at:

```text
http://localhost:8080/swagger-ui/index.html
```

## Example Authentication Flow

```http
POST /auth/login
Content-Type: application/json
```

Example:

```json
{
  "email": "admin@simplebiz.com",
  "password": "123456"
}
```

The API returns a JWT token that can be used to access protected endpoints.

## Why This Project Matters

SimpleBiz demonstrates more than isolated CRUD operations.

It brings together:

- backend architecture
- authentication and authorization
- relational data
- frontend integration
- API documentation
- validation
- business-oriented workflows

The goal is to demonstrate how common business requirements can be translated into a maintainable full-stack application.

## About

Built by **Adriel Rocha**.

Full-Stack Developer focused on business systems, APIs, integrations and automation.

🌎 Available for remote projects worldwide.

📧 contato.adriel.dev@gmail.com

🔗 https://github.com/Adriel-Rocha
