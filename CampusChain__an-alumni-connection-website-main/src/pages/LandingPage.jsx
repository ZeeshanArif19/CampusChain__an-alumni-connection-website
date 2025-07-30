import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaUsers, FaCalendarAlt, FaSearch, FaHeart, FaArrowRight } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FaGraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">CampusChain</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-indigo-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/auth"
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg border border-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/auth?mode=signup"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Connect with Your
                <span className="text-indigo-600"> Alumni Network</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                Stay connected with your university community. Find alumni, discover opportunities, 
                and build meaningful relationships that last a lifetime.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/auth"
                  className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors flex items-center justify-center"
                >
                  Login
                  <FaArrowRight className="ml-2" />
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
                >
                  Register
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <FaUsers className="text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Alumni Network</h3>
                      <p className="text-sm text-gray-500">1,247 members online</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <FaCalendarAlt className="text-green-600 text-sm" />
                      </div>
                      <span className="text-sm text-gray-600">Upcoming: Alumni Meet 2024</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaSearch className="text-blue-600 text-sm" />
                      </div>
                      <span className="text-sm text-gray-600">New job opportunities posted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose CampusChain?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides everything you need to stay connected with your university community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <FaUsers className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Alumni Directory</h3>
              <p className="text-gray-600">
                Connect with thousands of alumni from your university. Find mentors, collaborators, and friends.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <FaCalendarAlt className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Events & Meetups</h3>
              <p className="text-gray-600">
                Discover and attend alumni events, reunions, and networking opportunities in your area.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <FaSearch className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Career Opportunities</h3>
              <p className="text-gray-600">
                Find job opportunities, internships, and career advice from successful alumni in your field.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-100">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-6">
                <FaHeart className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Mentorship Program</h3>
              <p className="text-gray-600">
                Get guidance from experienced alumni or become a mentor to help current students.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-2xl border border-teal-100">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-6">
                <FaGraduationCap className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Learning Resources</h3>
              <p className="text-gray-600">
                Access exclusive workshops, webinars, and educational content from industry experts.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl border border-indigo-100">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <FaUsers className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Groups</h3>
              <p className="text-gray-600">
                Join interest-based groups and connect with alumni who share your passions and goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-indigo-100">Active Alumni</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-indigo-100">Events Hosted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">1,200+</div>
              <div className="text-indigo-100">Job Placements</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-indigo-100">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Alumni Say
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our community members about their experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold">S</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Software Engineer, Google</p>
                </div>
              </div>
              <p className="text-gray-600">
                "CampusChain helped me connect with amazing alumni who guided me through my career transition. The mentorship program is incredible!"
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold">M</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Michael Chen</h4>
                  <p className="text-sm text-gray-500">Product Manager, Microsoft</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The networking events are fantastic! I've met so many inspiring people and found my dream job through the platform."
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold">E</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Emily Rodriguez</h4>
                  <p className="text-sm text-gray-500">Marketing Director, Apple</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Being a mentor on CampusChain has been incredibly rewarding. I love helping current students achieve their goals."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Join Your Alumni Network?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Connect with thousands of alumni, discover opportunities, and build lasting relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-white hover:bg-gray-50 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/auth?mode=signup"
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FaGraduationCap className="h-8 w-8 text-indigo-400" />
                <span className="ml-2 text-xl font-bold">CampusChain</span>
              </div>
              <p className="text-gray-400">
                Connecting alumni worldwide and building a stronger university community.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentorship</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CampusChain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 