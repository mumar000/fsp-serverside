# Visa Application System

A backend system for managing visa applications with three types of forms: Study Visa, Work Permit, and Visit Visa.

## System Flow

### 1. Initial Request Submission
- User visits the website and selects a visa type
- Submits initial request with contact details
- System creates a pending request

### 2. Admin Review Process
- Admin views pending requests in admin panel
- Reviews each request
- Can approve or reject requests
- If approved, system automatically creates user account

### 3. User Form Completion
- User receives credentials (if approved)
- Logs in to the system
- Fills out the specific visa application form
- Uploads required documents
- System validates and stores documents securely

## API Endpoints

### Request System

#### 1. Submit New Request
- **Endpoint**: `POST /api/requests`
- **Public**: Yes
- **Description**: Submit a new visa application request
- **Request Body**:
```json
{
    "email_address": "user@example.com",
    "phone_number": "1234567890",
    "form_type": "Study Visa" // or "Work Permit" or "Visit Visa"
}
```
- **Response**: Created request object

#### 2. Get All Requests (Admin)
- **Endpoint**: `GET /api/requests`
- **Public**: No (Admin only)
- **Description**: Get all requests (pending, approved, rejected)
- **Headers Required**: `Authorization: Bearer <token>`
- **Response**: Array of all requests

#### 3. Get Pending Requests (Admin)
- **Endpoint**: `GET /api/requests/pending`
- **Public**: No (Admin only)
- **Description**: Get only pending requests
- **Headers Required**: `Authorization: Bearer <token>`
- **Response**: Array of pending requests

#### 4. Get Specific Request (Admin)
- **Endpoint**: `GET /api/requests/:requestId`
- **Public**: No (Admin only)
- **Description**: Get details of a specific request
- **Headers Required**: `Authorization: Bearer <token>`
- **Response**: Request object

#### 5. Process Request (Admin)
- **Endpoint**: `POST /api/requests/:requestId/process`
- **Public**: No (Admin only)
- **Description**: Approve or reject a request
- **Headers Required**: `Authorization: Bearer <token>`
- **Request Body**:
```json
{
    "status": "Approved", // or "Rejected"
    "admin_notes": "Request approved, credentials sent to user"
}
```
- **Response**: Updated request object

### User System

#### 1. User Login
- **Endpoint**: `POST /api/users/login`
- **Public**: Yes
- **Description**: Login with username and password
- **Request Body**:
```json
{
    "username": "user_123",
    "password": "password123"
}
```
- **Response**: JWT token and user details

#### 2. Get All Users (Admin)
- **Endpoint**: `GET /api/users/getallusers`
- **Public**: No (Admin only)
- **Description**: Get all registered users
- **Headers Required**: `Authorization: Bearer <token>`
- **Response**: Array of users (without passwords)

#### 3. Submit Form
- **Endpoint**: `POST /api/users/form/submit`
- **Public**: No (User only)
- **Description**: Submit visa application form with documents
- **Headers Required**: 
  - `Authorization: Bearer <token>`
  - `Content-Type: multipart/form-data`
- **Request Body**: Form data and files
- **Response**: Created form submission object

#### 4. Get User's Form
- **Endpoint**: `GET /api/users/form`
- **Public**: No (User only)
- **Description**: Get user's submitted form
- **Headers Required**: `Authorization: Bearer <token>`
- **Response**: User's form submission object

## Authentication

- JWT (JSON Web Token) based authentication
- Token expires in 24 hours
- Include token in Authorization header for protected routes:
```
Authorization: Bearer <your-jwt-token>
```

## File Upload System

- Secure file upload using Cloudinary
- Supports multiple file types (jpg, jpeg, png, pdf)
- Document validation for each visa type
- Required documents vary by visa type:
  - Study Visa: passport, transcripts, admission letter, etc.
  - Work Permit: passport, transcripts, work experience, etc.
  - Visit Visa: bank statements, employment proof, etc.

## Database Models

### Request Model
```javascript
{
    email_address: String,
    phone_number: String,
    form_type: String,
    status: String, // Pending/Approved/Rejected
    admin_notes: String,
    processed_by: ObjectId,
    processed_at: Date
}
```

### User Model
```javascript
{
    username: String,
    password: String,
    contact_details: {
        email_address: String,
        phone_number: String
    },
    form_type: String,
    approval_status: String,
    admin_comments: String,
    form_reference: ObjectId
}
```

## Environment Variables

Create a `.env` file with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create `.env` file with required variables
4. Start the server:
```bash
npm start
```

## Security Features

- Password hashing using bcrypt
- JWT token authentication
- Protected routes with middleware
- Input validation
- Secure password generation for new users
- No sensitive data exposure in responses
- Secure file upload handling
- Document type validation
- File size restrictions

## Error Handling

- All endpoints include proper error handling
- Appropriate HTTP status codes
- Descriptive error messages
- Validation checks for inputs
- File upload error handling
- Document validation errors
- Form submission validation 