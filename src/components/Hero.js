'use client';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Master Your Skills
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Join our platform to learn and grow with industry experts. Choose your path to success.
          </p>
          <div className="mt-10">
            <Link
              href="/signup"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Start as Skill
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 