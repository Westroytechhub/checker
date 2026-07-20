# BECE Checker - React Frontend

Modern React 18 application for the BECE Results Checker platform.

## Features

- Product listing with tiered pricing
- Shopping cart management
- Payment processing interface
- Results checker
- Guest checkout (no login required)
- Admin panel

## Tech Stack

- React 18+
- React Router v6
- Axios for API calls
- TailwindCSS for styling
- React Query for state management
- Context API for cart management

## Setup

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_API_BASE=http://localhost:8000
```

### Running Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/       # Reusable React components
│   ├── ProductCard.jsx
│   ├── Cart.jsx
│   ├── CheckoutForm.jsx
│   └── ResultsChecker.jsx
├── pages/           # Page components
│   ├── Products.jsx
│   ├── Checkout.jsx
│   └── Results.jsx
├── context/         # React Context for cart
│   └── CartContext.jsx
├── services/        # API services
│   └── api.js
├── utils/           # Utility functions
└── App.js           # Main App component
```

## API Integration

All API calls should be made through the `services/` directory using axios.

Example:
```javascript
import apiClient from '../services/api';

const fetchProducts = async () => {
  const response = await apiClient.get('/products');
  return response.data;
};
```

## Features

### Product Browsing
- Display all available products
- Show tiered pricing
- Select quantity with instant price calculation

### Shopping Cart
- Add products to cart
- View cart items
- Update quantities
- Calculate total

### Guest Checkout
- No login required
- Enter email and phone
- Select payment method (MTN, Vodafone, Airtel)
- Process payment

### Results Checker
- Public access (no login)
- Enter index number
- View exam results
