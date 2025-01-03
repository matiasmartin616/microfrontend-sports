import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="https://placehold.co/40?text=TF"
            alt="TeamFreak Logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="text-xl font-bold uppercase text-gray-800">
            Scoremax
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden items-center space-x-8 md:flex">
          <li>
            <Link
              to="/"
              className="text-gray-600 hover:text-green-600"
            >
              Live Results
            </Link>
          </li>
          <li>
            <Link
              to="/scoreboards"
              className="text-gray-600 hover:text-green-600"
            >
              Scoreboards
            </Link>
          </li>
          <li>
            <Link
              to="/team-stats"
              className="text-gray-600 hover:text-green-600"
            >
              Team Stats
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="inline-flex items-center text-gray-600 hover:text-gray-900 focus:outline-none md:hidden"
          aria-label="Toggle Menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <ul className="md:hidden flex flex-col space-y-2 px-4 py-2 border-t">
          <li>
            <Link
              to="/live-results"
              className="block text-gray-600 hover:text-green-600"
              onClick={() => setIsOpen(false)}
            >
              Live Results
            </Link>
          </li>
          <li>
            <Link
              to="/scoreboards"
              className="block text-gray-600 hover:text-green-600"
              onClick={() => setIsOpen(false)}
            >
              Scoreboards
            </Link>
          </li>
          <li>
            <Link
              to="/team-stats"
              className="block text-gray-600 hover:text-green-600"
              onClick={() => setIsOpen(false)}
            >
              Team Stats
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
