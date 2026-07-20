import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaCog } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { getCartCount } = useCart();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🎓 BECE Checker
        </Link>

        <nav className="flex gap-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-semibold">
            Home
          </Link>
          <Link to="/results" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold">
            <FaSearch /> Check Results
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold"
          >
            <FaShoppingCart /> Cart {getCartCount() > 0 && `(${getCartCount()})`}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
