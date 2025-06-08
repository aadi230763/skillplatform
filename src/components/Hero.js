'use client';
import Link from 'next/link';
import { useState, useEffect, useCallback, useMemo } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroContent = [
    {
      title: "Master Your Skills",
      subtitle: "Build job-relevant skills with hands-on projects",
      description: "Join millions of learners from around the world already learning on SkillPlatform.",
      cta: "Start Learning Today"
    },
  ];

  // Memoize courses data to prevent recreation
  const coursesData = useMemo(() => [
    {
      id: 1,
      title: "Machine Learning Specialization",
      provider: "DeepLearning.AI",
      type: "Specialization",
      image: "/api/placeholder/300/200",
      rating: 4.9,
      students: "2.5M",
      badge: "Most Popular",
      color: "bg-red-600"
    },
    {
      id: 2,
      title: "IBM DevOps and Software Engineering",
      provider: "IBM",
      type: "Professional Certificate",
      image: "/api/placeholder/300/200",
      rating: 4.7,
      students: "850K",
      badge: "Build toward a degree",
      color: "bg-blue-600"
    },
    {
      id: 3,
      title: "Preparing for Google Cloud Certification: Cloud Architect",
      provider: "Google Cloud",
      type: "Professional Certificate",
      image: "/api/placeholder/300/200",
      rating: 4.6,
      students: "320K",
      badge: "Build toward a degree",
      color: "bg-yellow-600"
    },
    {
      id: 4,
      title: "Google IT Support",
      provider: "Google",
      type: "Professional Certificate",
      image: "/api/placeholder/300/200",
      rating: 4.8,
      students: "1.2M",
      badge: "New AI skills",
      color: "bg-green-600"
    },
    {
      id: 5,
      title: "Google Cybersecurity",
      provider: "Google",
      type: "Professional Certificate",
      image: "/api/placeholder/300/200",
      rating: 4.7,
      students: "890K",
      badge: "Build toward a degree",
      color: "bg-purple-600"
    },
    {
      id: 6,
      title: "Meta Back-End Developer",
      provider: "Meta",
      type: "Professional Certificate",
      image: "/api/placeholder/300/200",
      rating: 4.6,
      students: "650K",
      badge: "Build toward a degree",
      color: "bg-indigo-600"
    },
    {
      id: 7,
      title: "IBM Full Stack Software Developer",
      provider: "IBM",
      type: "Professional Certificate",
      image: "/api/placeholder/300/200",
      rating: 4.5,
      students: "420K",
      badge: "AI skills",
      color: "bg-teal-600"
    },
    {
      id: 8,
      title: "Meta Android Developer",
      provider: "Meta",
      type: "Professional Certificate",
      image: "/api/placeholder/300/200",
      rating: 4.4,
      students: "280K",
      badge: "Build toward a degree",
      color: "bg-orange-600"
    },
    {
      id: 9,
      title: "AWS Cloud Solutions Architect",
      provider: "Amazon",
      type: "Professional Certificate",
      image: "/api/placeholder/300/200",
      rating: 4.8,
      students: "540K",
      badge: "High Demand",
      color: "bg-yellow-500"
    },
    {
      id: 10,
      title: "Data Science Specialization",
      provider: "Johns Hopkins University",
      type: "Specialization",
      image: "/api/placeholder/300/200",
      rating: 4.6,
      students: "1.8M",
      badge: "University",
      color: "bg-blue-700"
    },
    {
      id: 11,
      title: "Python for Everybody Specialization",
      provider: "University of Michigan",
      type: "Specialization",
      image: "/api/placeholder/300/200",
      rating: 4.8,
      students: "3.2M",
      badge: "Beginner Friendly",
      color: "bg-green-700"
    },
    {
      id: 12,
      title: "Digital Marketing Specialization",
      provider: "University of Illinois",
      type: "Specialization",
      image: "/api/placeholder/300/200",
      rating: 4.5,
      students: "680K",
      badge: "Career Ready",
      color: "bg-pink-600"
    }
  ], []);

  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [loadedCount, setLoadedCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroContent.length]);

  // Initialize with first 8 courses
  useEffect(() => {
    setDisplayedCourses(coursesData.slice(0, 8));
  }, [coursesData]);

  // Throttled scroll handler
  const throttle = useCallback((func, delay) => {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }, []);

  // Optimized load more function
  const loadMoreCourses = useCallback(() => {
    if (isLoading || loadedCount >= coursesData.length) return;
    
    setIsLoading(true);
    
    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(() => {
      const remainingCourses = coursesData.slice(loadedCount);
      const nextBatch = remainingCourses.slice(0, 4);
      setDisplayedCourses(prev => [...prev, ...nextBatch]);
      setLoadedCount(prev => prev + 4);
      setIsLoading(false);
    });
  }, [coursesData, loadedCount, isLoading]);

  // Optimized scroll handler with intersection observer fallback
  const handleScroll = useCallback(() => {
    if (isLoading || loadedCount >= coursesData.length) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Load more when user is 800px from bottom (reduced from 1000px)
    if (scrollTop + windowHeight >= documentHeight - 800) {
      loadMoreCourses();
    }
  }, [loadMoreCourses, isLoading, loadedCount, coursesData.length]);

  const throttledHandleScroll = useMemo(
    () => throttle(handleScroll, 100), // Throttle to 100ms
    [handleScroll, throttle]
  );

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [throttledHandleScroll]);

  // Memoized course card component
  const CourseCard = useCallback(({ course, index }) => (
    <div 
      key={course.id} 
      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden will-change-transform"
    >
      {/* Course Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {index === 0 ? (
          <div className={`absolute inset-0 ${course.color} flex items-center justify-center`}>
            <div className="text-center text-white p-6">
              <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full mx-auto flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Badge */}
        {course.badge && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white text-gray-700 shadow-sm">
              ✨ {course.badge}
            </span>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
            <span className="text-xs font-bold text-gray-600">
              {course.provider.charAt(0)}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-600">{course.provider}</span>
        </div>

        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        <div className="flex items-center text-sm text-gray-600 mb-4">
          <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span className="mr-2">{course.rating}</span>
          <span className="text-gray-400">•</span>
          <span className="ml-2">{course.students} students</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-blue-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Build toward a degree
          </div>
          <span className="text-sm font-medium text-gray-700">{course.type}</span>
        </div>
      </div>
    </div>
  ), []);

  return (
    <>
      {/* Optimized Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        {/* Simplified Background Pattern - reduced animations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                  🎓 Join 100M+ learners worldwide
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {heroContent[currentSlide].title}
                </span>
              </h1>
              
              <h2 className="text-xl lg:text-2xl text-gray-700 font-medium mb-4">
                {heroContent[currentSlide].subtitle}
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                {heroContent[currentSlide].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
                >
                  {heroContent[currentSlide].cta}
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                
                <Link
                  href="/explore"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-full hover:border-blue-500 hover:text-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Browse Courses
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200">
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-gray-900">100M+</div>
                  <div className="text-sm text-gray-600">Learners</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-gray-900">5,400+</div>
                  <div className="text-sm text-gray-600">Courses</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-gray-900">100+</div>
                  <div className="text-sm text-gray-600">Partners</div>
                </div>
              </div>
            </div>

            {/* Right Content - Simplified animations */}
            <div className="relative lg:pl-8">
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500 will-change-transform">
                  <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Learning</h3>
                      <p className="text-gray-600">Learn by doing with hands-on projects</p>
                    </div>
                  </div>
                  
                  {/* Progress indicators */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Course Progress</span>
                      <span className="text-sm text-gray-500">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>

                {/* Simplified floating cards - removed heavy animations */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 z-20">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-900">Certificate Earned!</span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 z-20">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-900">Join 1M+ students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {heroContent.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Optimized Courses Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Most Popular Certificates
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advance your career with industry-recognized certificates from top companies and universities
            </p>
          </div>

          {/* Optimized Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {displayedCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>

          {/* Show More Button */}
          {loadedCount < coursesData.length && (
            <div className="text-center">
              <button
                onClick={loadMoreCourses}
                disabled={isLoading}
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : 'Show 4 more'}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Optimized Personalized Specializations Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Personalized Specializations for You
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover courses tailored to your interests and career goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coursesData.slice(4, 8).map((course, index) => (
              <CourseCard key={course.id} course={course} index={index + 4} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;