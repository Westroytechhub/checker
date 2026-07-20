import React from 'react';
import CartSummary from '../components/CartSummary';

const CartPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <CartSummary showCheckoutButton={true} />
      </div>
    </div>
  );
};

export default CartPage;
