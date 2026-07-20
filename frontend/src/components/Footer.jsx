import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">🎓 BECE Checker</h3>
            <p className="text-gray-400">
              Fast and reliable exam results checking service
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/results" className="hover:text-white">Check Results</a></li>
              <li><a href="/cart" className="hover:text-white">Shopping Cart</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>📧 support@becechecker.com</li>
              <li>📱 +233 XXX XXX XXX</li>
              <li>💬 24/7 Customer Support</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Westroy Tech Hub. All rights reserved.</p>
          <p className="text-sm mt-2">
            Terms of Service • Privacy Policy • Cookie Policy
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
