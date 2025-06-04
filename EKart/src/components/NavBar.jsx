import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-indigo-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
            <Link to={"/"}>
                <h2 className="text-2xl font-bold tracking-tight">eKart</h2>
            </Link>
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-lg font-medium hover:text-indigo-200 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="text-lg font-medium hover:text-indigo-200 transition-colors duration-200"
            >
              Cart
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden bg-indigo-600">
            <div className="flex flex-col space-y-4 py-4 px-4">
              <Link
                to="/"
                className="text-lg font-medium hover:text-indigo-200 transition-colors duration-200"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/cart"
                className="text-lg font-medium hover:text-indigo-200 transition-colors duration-200"
                onClick={toggleMenu}
              >
                Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;