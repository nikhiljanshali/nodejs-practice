# Postman API Testing Guide

## Base URL
```
http://localhost:5000/api
```

---

## 1. AUTHENTICATION ENDPOINTS

### 1.1 User Registration (Signup)
**Method**: `POST`  
**URL**: `http://localhost:5000/api/auth/signup`

**Headers**:
```json
{
  "Content-Type": "application/json"
}
```

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Expected Response** (201 Created):
```json
{
  "message": "User registered successfully",
  "status": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 1.2 User Login
**Method**: `POST`  
**URL**: `http://localhost:5000/api/auth/login`

**Headers**:
```json
{
  "Content-Type": "application/json"
}
```

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Expected Response** (200 OK):
```json
{
  "message": "Login successful",
  "status": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**⚠️ IMPORTANT**: Save the `token` from the response. You'll need it for all Todo requests.

---

## 2. TODO ENDPOINTS
**All Todo endpoints require authentication. Add this header to all requests:**

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
}
```

---

### 2.1 Create Single Todo
**Method**: `POST`  
**URL**: `http://localhost:5000/api/todos/create`

**Headers**:
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Request Body**:
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "high",
  "dueDate": "2026-04-15"
}
```

**Expected Response** (200 OK):
```json
{
  "message": "Todo created successfully",
  "status": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "priority": "high",
    "dueDate": "2026-04-15",
    "completed": false,
    "createdAt": "2026-04-08T10:00:00Z"
  }
}
```

---

### 2.2 Create Multiple Todos
**Method**: `POST`  
**URL**: `http://localhost:5000/api/todos/createMultiple`

**Headers**:
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
}
```

**Request Body**:
```json
{
  "todos": [
    {
      "title": "Complete project",
      "description": "Finish Angular frontend",
      "priority": "high",
      "dueDate": "2026-04-10"
    },
    {
      "title": "Code review",
      "description": "Review team code",
      "priority": "medium",
      "dueDate": "2026-04-12"
    },
    {
      "title": "Update documentation",
      "description": "Update API docs",
      "priority": "low",
      "dueDate": "2026-04-20"
    }
  ]
}
```

**Expected Response** (200 OK):
```json
{
  "message": "Todos created successfully",
  "status": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "userId": "507f1f77bcf86cd799439011",
      "title": "Complete project",
      "description": "Finish Angular frontend",
      "priority": "high",
      "dueDate": "2026-04-10",
      "completed": false,
      "createdAt": "2026-04-08T10:05:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439014",
      "userId": "507f1f77bcf86cd799439011",
      "title": "Code review",
      "description": "Review team code",
      "priority": "medium",
      "dueDate": "2026-04-12",
      "completed": false,
      "createdAt": "2026-04-08T10:05:00Z"
    }
  ]
}
```

---

### 2.3 Get All Todos
**Method**: `GET`  
**URL**: `http://localhost:5000/api/todos/read`

**Headers**:
```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
}
```

**Request Body**: (None)

**Expected Response** (200 OK):
```json
{
  "message": "Todos retrieved successfully",
  "status": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "userId": "507f1f77bcf86cd799439011",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "priority": "high",
      "dueDate": "2026-04-15",
      "completed": false,
      "createdAt": "2026-04-08T10:00:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "userId": "507f1f77bcf86cd799439011",
      "title": "Complete project",
      "description": "Finish Angular frontend",
      "priority": "high",
      "dueDate": "2026-04-10",
      "completed": true,
      "createdAt": "2026-04-08T10:05:00Z"
    }
  ]
}
```

---

### 2.4 Get Todo by ID
**Method**: `GET`  
**URL**: `http://localhost:5000/api/todos/read/507f1f77bcf86cd799439012`

**Headers**:
```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
}
```

**Request Body**: (None)

**Expected Response** (200 OK):
```json
{
  "message": "Todo retrieved successfully",
  "status": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "priority": "high",
    "dueDate": "2026-04-15",
    "completed": false,
    "createdAt": "2026-04-08T10:00:00Z"
  }
}
```

---

### 2.5 Update Todo
**Method**: `POST`  
**URL**: `http://localhost:5000/api/todos/update/507f1f77bcf86cd799439012`

**Headers**:
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
}
```

**Request Body**:
```json
{
  "title": "Buy groceries and cook",
  "description": "Milk, eggs, bread, then prepare dinner",
  "priority": "high",
  "completed": true,
  "dueDate": "2026-04-15"
}
```

**Expected Response** (200 OK):
```json
{
  "message": "Todo updated successfully",
  "status": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Buy groceries and cook",
    "description": "Milk, eggs, bread, then prepare dinner",
    "priority": "high",
    "dueDate": "2026-04-15",
    "completed": true,
    "updatedAt": "2026-04-08T11:00:00Z"
  }
}
```

---

### 2.6 Delete Todo
**Method**: `DELETE`  
**URL**: `http://localhost:5000/api/todos/delete/507f1f77bcf86cd799439012`

**Headers**:
```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
}
```

**Request Body**: (None)

**Expected Response** (200 OK):
```json
{
  "message": "Todo deleted successfully",
  "status": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012"
  }
}
```

---

### 2.7 Get Todo Count
**Method**: `GET`  
**URL**: `http://localhost:5000/api/todos/counter`

**Headers**:
```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
}
```

**Request Body**: (None)

**Expected Response** (200 OK):
```json
{
  "message": "Todo count retrieved successfully",
  "status": true,
  "data": {
    "totalTodos": 5,
    "completedTodos": 2,
    "pendingTodos": 3
  }
}
```

---

## Postman Collection Setup Steps

### Step 1: Create a New Collection
1. Open Postman
2. Click **+ New Collection**
3. Name it: `MEAN Stack Todo API`

### Step 2: Create Environment Variables (Optional but Recommended)
1. Click **Environments** in the left panel
2. Click **+** to create new environment
3. Name it: `Development`
4. Add variables:
   - `base_url`: `http://localhost:5000/api`
   - `token`: *(leave empty initially)*
   - `userId`: *(leave empty initially)*

### Step 3: Add Requests
1. Create folders: `Auth` and `Todos`
2. Add requests as shown above
3. Use `{{base_url}}` instead of hardcoded URL
4. Use `{{token}}` in Authorization header

### Step 4: Auto-save Token
After login request, add this in the **Tests** tab:
```javascript
if (pm.response.code === 200) {
  let jsonData = pm.response.json();
  pm.environment.set("token", jsonData.data.token);
}
```

---

## Testing Sequence

1. ✅ **Register user** (Signup)
2. ✅ **Login** and save token
3. ✅ **Create single todo**
4. ✅ **Create multiple todos**
5. ✅ **Get all todos**
6. ✅ **Get todo by ID**
7. ✅ **Update todo**
8. ✅ **Get todo count**
9. ✅ **Delete todo**

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Check if token is included in Authorization header |
| Token format wrong | Use: `Authorization: Bearer YOUR_TOKEN` (not just token) |
| 500 Server Error | Check backend console for error messages |
| Database connection error | Ensure MongoDB is running on your system |
| Port 5000 not found | Check if backend server is running |

---

## Notes
- All passwords should be at least 8 characters
- All email addresses should be unique
- JWT tokens expire after a certain period (check your backend)
- Always include the `Bearer ` prefix in the Authorization header
