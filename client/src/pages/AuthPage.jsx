import React, { useState, useEffect } from 'react';
import { FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';

const AuthPage = () => {
  const [active, setActive] = useState(false); // false = sign in, true = sign up
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', role: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '', role: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Prevent browser from caching the login page
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Cache-Control';
    meta.content = 'no-store, no-cache, must-revalidate, max-age=0';
    document.head.appendChild(meta);

    // Force reload if coming from a protected page (after logout)
    if (performance && performance.navigation && performance.navigation.type === 2) {
      window.location.reload(true);
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'signup') {
      setActive(true);
    } else {
      setActive(false);
    }

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  // Signup Handler
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Signup failed');
      } else {
        alert('Signup successful! You can now login.');
        setActive(false);
        setSignupData({ name: '', email: '', password: '', role: '' });
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  // Login Handler
  // Login Handler
const handleSignIn = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    // Use /api/admin/login for admin, /api/auth/login for others
    const loginUrl = loginData.role === 'admin'
      ? 'http://localhost:5000/api/admin/login'
      : 'http://localhost:5000/api/auth/login';
    const res = await fetch(loginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || 'Login failed');
    } else {
      // ✅ Store token, email, name, and role in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.user) {
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('role', data.user.role);
      }

      // ✅ Redirect based on role
      if (data.user.role === 'student') {
        window.location.href = '/student/profile';
      } else if (data.user.role === 'alumni') {
        window.location.href = '/alumni/profile';
      } else if (data.user.role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/';
      }
    }
  } catch (err) {
    setError('Network error. Please try again.');
  }

  setLoading(false);
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff]">
      <div
        className="relative w-[768px] max-w-full min-h-[480px] bg-white rounded-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] overflow-hidden"
        id="container"
      >
        {/* Sign Up Form */}
        <div 
          className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-700 ease-in-out bg-white flex flex-col items-center justify-center px-10 text-center ${
            active ? 'translate-x-full opacity-100 z-20' : 'opacity-0 z-10 pointer-events-none'
          }`}
        >
          <form onSubmit={handleSignUp} className="w-full">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <div className="flex gap-2 my-5 justify-center">
              <a href="#" className="border border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center text-xl text-[#db4437] hover:bg-gray-100 transition"><FaGooglePlusG /></a>
              <a href="#" className="border border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center text-xl text-[#0077b5] hover:bg-gray-100 transition"><FaLinkedinIn /></a>
            </div>
            <span className="text-xs mb-2 block">or use your email for registration</span>
            <input type="text" placeholder="Name" className="bg-[#eee] rounded-lg px-4 py-2 my-2 w-full text-sm outline-none" required value={signupData.name} onChange={e => setSignupData({ ...signupData, name: e.target.value })} />
            <input type="email" placeholder="Email" className="bg-[#eee] rounded-lg px-4 py-2 my-2 w-full text-sm outline-none" required value={signupData.email} onChange={e => setSignupData({ ...signupData, email: e.target.value })} />
            <input type="password" placeholder="Password" className="bg-[#eee] rounded-lg px-4 py-2 my-2 w-full text-sm outline-none" required value={signupData.password} onChange={e => setSignupData({ ...signupData, password: e.target.value })} />
            <select className="bg-[#eee] rounded-lg px-4 py-2 my-2 w-full text-sm outline-none" required value={signupData.role} onChange={e => setSignupData({ ...signupData, role: e.target.value })}>
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
            </select>
            {error && active && <div className="text-red-500 text-sm mt-2">{error}</div>}
            <button type="submit" className="bg-[#8810c5] text-white font-semibold text-xs px-12 py-2 rounded-lg uppercase mt-3 tracking-wider shadow hover:bg-[#6d0fa3] transition" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div 
          className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-700 ease-in-out bg-white flex flex-col items-center justify-center px-10 text-center ${
            active ? 'translate-x-full opacity-0 z-10 pointer-events-none' : 'opacity-100 z-20'
          }`}
        >
          <form onSubmit={handleSignIn} className="w-full">
            <h1 className="text-3xl font-bold mb-2">Sign In</h1>
            <div className="flex gap-2 my-5 justify-center">
              <a href="#" className="border border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center text-xl text-[#db4437] hover:bg-gray-100 transition"><FaGooglePlusG /></a>
              <a href="#" className="border border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center text-xl text-[#0077b5] hover:bg-gray-100 transition"><FaLinkedinIn /></a>
            </div>
            <span className="text-xs mb-2 block">or use your email password</span>
            <input type="email" placeholder="Email" className="bg-[#eee] rounded-lg px-4 py-2 my-2 w-full text-sm outline-none" required value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} />
            <input type="password" placeholder="Password" className="bg-[#eee] rounded-lg px-4 py-2 my-2 w-full text-sm outline-none" required value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} />
            <select className="bg-[#eee] rounded-lg px-4 py-2 my-2 w-full text-sm outline-none" required value={loginData.role} onChange={e => setLoginData({ ...loginData, role: e.target.value })}>
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
              <option value="admin">Admin</option>
            </select>
            <a href="#" className="text-gray-700 text-xs mt-2 mb-1 hover:underline block">Forget Your Password?</a>
            {error && !active && <div className="text-red-500 text-sm mt-2">{error}</div>}
            <button type="submit" className="bg-[#8810c5] text-white font-semibold text-xs px-12 py-2 rounded-lg uppercase mt-3 tracking-wider shadow hover:bg-[#6d0fa3] transition" disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</button>
          </form>
        </div>

        {/* Toggle Container */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out z-30 ${active ? 'translate-x-[-100%] rounded-[0_150px_100px_0]' : 'rounded-[150px_0_0_100px]'}`}>
          <div className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white absolute left-[-100%] w-[200%] h-full flex transition-all duration-700 ease-in-out" style={{ transform: active ? 'translateX(50%)' : 'translateX(0)' }}>
            {/* Left Panel */}
            <div className={`w-1/2 h-full flex flex-col items-center justify-center px-8 text-center absolute top-0 transition-all duration-700 ease-in-out ${active ? '' : '-translate-x-full'}`}>
              <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
              <p className="text-sm mb-6">Enter your personal details to use all of site features</p>
              <button
                className="bg-transparent border border-white text-white font-semibold text-xs px-12 py-2 rounded-lg uppercase tracking-wider hover:bg-white hover:text-[#764ba2] transition"
                onClick={() => setActive(false)}
                id="login"
                type="button"
              >
                Sign In
              </button>
            </div>
            {/* Right Panel */}
            <div className={`w-1/2 h-full flex flex-col items-center justify-center px-8 text-center absolute right-0 top-0 transition-all duration-700 ease-in-out ${active ? 'translate-x-full' : ''}`}>
              <h1 className="text-3xl font-bold mb-2">Hello, Friend!</h1>
              <p className="text-sm mb-6">Register with your personal details to use all of site features</p>
              <button
                className="bg-transparent border border-white text-white font-semibold text-xs px-12 py-2 rounded-lg uppercase tracking-wider hover:bg-white hover:text-[#764ba2] transition"
                onClick={() => setActive(true)}
                id="register"
                type="button"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 