'use client';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center h-16 justify-start gap-4">

          {/* Logo */}
          <div className="flex items-center pr-4 mr-auto">
  <Link href="/" className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-sm">S</span>
    </div>
    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent -ml-2">
      SkillPlatform
    </span>
  </Link>
</div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/explore" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              Explore Courses
            </Link>
            <Link href="/degrees" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              Dashboard
            </Link>
            <Link href="/careers" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">

            Recruitment

  
            </Link>
            <Link href="/business" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              Comunities
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Log In
            </Link>
            <Link 
              href="/signup" 
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Join for Free
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link href="/explore" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Explore
              </Link>
              <Link href="/degrees" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Online Degrees
              </Link>
              <Link href="/careers" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Careers
              </Link>
              <Link href="/business" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                For Business
              </Link>
              <div className="pt-4 border-t border-gray-100">
                <input
                  type="text"
                  placeholder="What do you want to learn?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;