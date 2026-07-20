# BECE Checker Platform - Setup Guide

Complete setup instructions for the BECE Results Checker platform.

## Prerequisites

- **Node.js** 16+ (for React frontend)
- **PHP** 8.0+ (for backend API)
- **MySQL** 8.0+ (for database)
- **Composer** (PHP package manager)
- **Git** (for version control)
- **npm or yarn** (for Node package management)

## Project Structure

```
checker/
├── frontend/          # React 18 application
├── backend/           # PHP REST API
├── database/          # MySQL schemas
├── docs/              # Documentation
└── README.md
```

## 1. Database Setup

### Create Database

```bash
mysql -u root -p
```

```sql
CREATE DATABASE bece_checker;
USE bece_checker;
source /path/to/checker/database/schema.sql;
```

## 2. Backend Setup (PHP)

### Navigate to backend directory

```bash
cd backend
```

### Install dependencies

```bash
composer install
```

### Setup environment variables

```bash
cp config/.env.example config/.env
```

Edit `config/.env` and update:
- Database credentials
- JWT secret
- Payment gateway API keys
- SMTP settings

### Start the PHP server

```bash
php -S localhost:8000
```

API will be available at: `http://localhost:8000/api`

## 3. Frontend Setup (React)

### Navigate to frontend directory

```bash
cd frontend
```

### Install dependencies

```bash
npm install
# or
yarn install
```

### Setup environment variables

```bash
cp .env.example .env
```

The default `.env` should work for local development:
```
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_API_BASE=http://localhost:8000
```

### Start the React development server

```bash
npm start
# or
yarn start
```

Frontend will open at: `http://localhost:3000`

## 4. Testing the Platform

### Create a Test User

1. Go to `http://localhost:3000`
2. Click "Sign Up"
3. Register with test credentials:
   - Email: test@example.com
   - Password: Test123!@

### Test a Purchase

1. Login with your test account
2. Browse products
3. Select a product and quantity
4. Proceed to payment
5. Enter mobile money details (test number)

### Admin Access

To access admin features:
1. Create a user account
2. In MySQL, update the user role:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

## 5. Payment Gateway Configuration

### For MTN Mobile Money

1. Register at MTN Developer Portal: https://developer.mtn.com
2. Get your API credentials
3. Add to `.env`:
   ```
   MTN_API_KEY=your_key
   MTN_API_URL=https://api.mtn.com/v1
   ```

### For Vodafone Cash

1. Contact Vodafone Business for API access
2. Add credentials to `.env`:
   ```
   VODAFONE_API_KEY=your_key
   VODAFONE_API_URL=https://api.vodafone.com/v1
   ```

### For Airtel Money

1. Register at Airtel Money Developer: https://developer.airtel.com
2. Get credentials
3. Add to `.env`:
   ```
   AIRTEL_API_KEY=your_key
   AIRTEL_API_URL=https://api.airtel.com/v1
   ```

## 6. Email Configuration

### Using Gmail SMTP

1. Generate an App Password: https://myaccount.google.com/apppasswords
2. Update `.env`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASSWORD=your_app_password
   ```

## 7. File Uploads

Create necessary directories:

```bash
mkdir -p backend/uploads
mkdir -p backend/logs
chmod -R 755 backend/uploads
chmod -R 755 backend/logs
```

## 8. Running in Production

### Frontend Build

```bash
cd frontend
npm run build
```

This creates an optimized build in `frontend/build/`

### Backend Deployment

1. Upload backend files to your server
2. Install dependencies: `composer install`
3. Set environment variables on server
4. Update database credentials
5. Configure web server (Apache/Nginx) to point to backend directory

### Database Migrations

On production server:

```bash
mysql -u db_user -p db_name < database/schema.sql
```

## 9. Troubleshooting

### Frontend won't connect to API

- Check `.env` has correct `REACT_APP_API_URL`
- Ensure backend is running: `http://localhost:8000`
- Check browser console for CORS errors

### PHP server won't start

```bash
# Check PHP version
php -v

# Check if port 8000 is in use
lsof -i :8000

# Use different port
php -S localhost:8001
```

### Database connection errors

- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database exists: `SHOW DATABASES;`

### Payment gateway errors

- Verify API keys are correct
- Check network connectivity
- Review payment provider documentation

## 10. API Documentation

Key endpoints:

```
Authentication:
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile

Products:
GET    /api/products
GET    /api/products/:id

Orders:
POST   /api/orders
GET    /api/orders
GET    /api/orders/:id

Payments:
POST   /api/payments/initiate
POST   /api/payments/verify

Results:
POST   /api/results/check
GET    /api/results/:id
```

## Next Steps

1. Customize branding in frontend
2. Configure payment gateways
3. Set up email templates
4. Add more exam types in database
5. Deploy to production server

## Support

For issues or questions, please check the individual README files:
- Frontend: `frontend/README.md`
- Backend: `backend/README.md`
