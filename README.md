# Student Management System API

This project is a basic **Student Management System API** built using **Node.js**, **Express.js**, **TypeScript**, and **MongoDB Atlas**. The system includes endpoints for both admin and student functionalities, such as adding students, assigning tasks, listing the tasks.

---

## Features

### Admin Panel
- Admin can log in using predefined credentials.
- Admin can add students with details such as name, email, department, and password.
- Admin can assign tasks to students with a due date.

### Student Interface
- Students can log in using their email ID and password.
- Students can view tasks assigned to them, including task status (pending, overdue, or completed).
- Students can update the status of their tasks to "completed."

---

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for building APIs.
- **TypeScript**: For strict typing and maintainability.
- **MongoDB Atlas**: Database for storing data.
- **JWT (JSON Web Tokens)**: For authentication.
- **Postman**: For API testing and documentation.

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following variables:
   ```env
   MONGO_URI=<Your MongoDB Atlas connection string>
   JWT_SECRET=<Your JWT Secret>
   PORT=<Port number>
   ```

4. Compile the TypeScript code:
   ```bash
   npm run build
   ```

5. Start the application:
   - **For development:**
     ```bash
     npm run dev
     ```
   - **For production:**
     ```bash
     npm run start
     ```

---

## Predefined Credentials

| Role  | Email              | Password |
|-------|--------------------|----------|
| Admin | admin@admin.com    | admin    |

---

## Endpoints

### Authentication

1. **Admin Login**  
   `POST /api/admin/login`
   - Request Body:
     ```json
     {
       "email": "admin@admin.com",
       "password": "admin"
     }
     ```

2. **Student Login**  
   `POST /api/student/login`
   - Request Body:
     ```json
     {
       "email": "student@example.com",
       "password": "password123"
     }
     ```

### Admin Operations

1. **Add Student**  
   `POST /api/admin/students`
   - Headers:
     ```json
     {
       "Authorization": "Bearer <JWT_TOKEN>"
     }
     ```
   - Request Body:
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "department": "Computer Science",
       "password": "password123"
     }
     ```

2. **Assign Task**  
   `POST /api/admin/tasks`
   - Headers:
     ```json
     {
       "Authorization": "Bearer <JWT_TOKEN>"
     }
     ```
   - Request Body:
     ```json
     {
       "studentId": "<STUDENT_ID>",
       "task": "Complete Assignment 1",
       "dueDate": "2025-01-31"
     }
     ```

### Student Operations

1. **View Tasks**  
   `GET /api/student/tasks`
   - Headers:
     ```json
     {
       "Authorization": "Bearer <JWT_TOKEN>"
     }
     ```

2. **Update Task Status**  
   `PATCH /api/student/tasks/:taskId`
   - Headers:
     ```json
     {
       "Authorization": "Bearer <JWT_TOKEN>"
     }
     ```
   - Request Body:
     ```json
     {
       "status": "completed"
     }
     ```

---

## Testing the API

POSTMAN DOCUMENTATION : `https://documenter.getpostman.com/view/32051313/2sAYQdjq9w`

---
