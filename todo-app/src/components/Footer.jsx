import React from 'react';
import { FaHeart, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-100 mt-12">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-3">My Tasks</h3>
            <p className="text-gray-400 text-sm">
              A simple yet powerful task management application to help you stay organized and productive.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Features</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>✅ Local Storage</li>
              <li>✅ Categories & Priority</li>
              <li>✅ Due Dates</li>
              <li>✅ Statistics</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>Made with <FaHeart className="inline text-red-500" /> by Westroy Tech Hub</p>
          <p>&copy; {currentYear} My Tasks App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
