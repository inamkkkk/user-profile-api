# User Profile API

A Node.js backend for managing user profiles with personal details and social links.

## Features

*   User authentication (JWT)
*   Profile creation, retrieval, update, and deletion
*   Social link management

## Technologies

*   Node.js
*   Express.js
*   MongoDB
*   Mongoose
*   JSON Web Tokens (JWT)
*   bcrypt

## Installation

1.  Clone the repository:
    
    git clone <repository_url>
    
2.  Install dependencies:
    
    npm install
    
3.  Configure environment variables:
    *   Create a `.env` file in the root directory.
    *   Define the following variables:
        *   `PORT`: The port the server will listen on (e.g., `3000`).
        *   `MONGODB_URI`: The MongoDB connection string.
        *   `JWT_SECRET`: A secret key for signing JWTs.

4.  Start the server:
    
    npm start
    

## API Endpoints

### Authentication

*   `POST /api/auth/register`: Register a new user.
*   `POST /api/auth/login`: Log in an existing user.

### User Profiles

*   `GET /api/profiles/:id`: Get a user profile by ID.
*   `PUT /api/profiles/:id`: Update a user profile by ID (requires authentication).
*   `DELETE /api/profiles/:id`: Delete a user profile by ID (requires authentication).
*   `GET /api/profiles/me`: Get the current user's profile (requires authentication).

### Social Links

*   `POST /api/profiles/:id/social`: Add a social link to a user profile (requires authentication).
*   `DELETE /api/profiles/:id/social/:socialId`: Delete a social link from a user profile (requires authentication).

## Contributing

Contributions are welcome! Please submit a pull request.
