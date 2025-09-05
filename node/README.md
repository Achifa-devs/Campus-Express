# CampusSphere Server

A professional Node.js eCommerce server for CampusSphere application built with Express.js, PostgreSQL, and modern JavaScript.

## Features

- **RESTful API** with proper HTTP status codes
- **Authentication & Authorization** with JWT
- **File Upload** with Cloudinary integration
- **Rate Limiting** for API protection
- **Security** with Helmet and CORS
- **Error Handling** with custom middleware
- **Database** with PostgreSQL and connection pooling
- **Logging** with Morgan
- **Environment Configuration** with dotenv

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **File Storage**: Cloudinary
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Morgan
- **Process Management**: PM2 (recommended for production)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration values

5. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm run build` - Build the project with Babel
- `npm run prod` - Build and start production server
- `npm run clean` - Clean build directory

## Project Structure

```
src/
├── app.js              # Express app configuration
├── server.js           # Server startup
├── config/
│   └── db.js          # Database configuration
├── controllers/
│   └── general.js     # Business logic controllers
├── routes/
│   └── general.js     # Route definitions
├── middleware/
│   ├── auth.js        # Authentication middleware
│   ├── errorHandler.js # Error handling middleware
│   └── notFound.js    # 404 handler
├── repositories/       # Data access layer
├── services/          # Business services
└── utils/             # Utility functions
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### General
- `GET /health` - Health check
- `POST /save-article` - Save article
- `GET /notice` - Get notices
- `POST /upload` - Upload file
- `POST /delete` - Delete file

### Shop
- `GET /api/shop/products` - Get products
- `POST /api/shop/products` - Create product
- `PUT /api/shop/products/:id` - Update product
- `DELETE /api/shop/products/:id` - Delete product

## Environment Variables

See `.env.example` for all required environment variables.

## Security Features

- Helmet for security headers
- Rate limiting
- CORS configuration
- Input validation
- JWT authentication
- Password hashing with bcrypt

## Error Handling

The application includes comprehensive error handling:
- Custom error classes
- Centralized error middleware
- Proper HTTP status codes
- Development vs production error responses

## Logging

- Request logging with Morgan
- Error logging
- Database connection logging

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start with PM2:
   ```bash
   pm2 start ecosystem.config.js
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support, please contact the development team.