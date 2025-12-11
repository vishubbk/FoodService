import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [username, setUsername] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("username");
    setIsLoggedIn(!!token);
    if (name) setUsername(name);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    setShowProfileMenu(false);
    // if you use routing (react-router) you can redirect here
    // e.g. navigate('/')
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // ----- Demo login behavior -----
    // In a real app replace this with API call to backend that returns a token + username
    if (form.email && form.password) {
      const fakeToken = btoa(form.email + ":" + form.password + ":" + Date.now());
      localStorage.setItem("token", fakeToken);
      localStorage.setItem("username", form.email.split("@")[0] || form.email);
      setIsLoggedIn(true);
      setUsername(form.email.split("@")[0] || form.email);
      setForm({ email: "", password: "" });
    } else {
      alert("Please enter email and password (demo)");
    }
  };

  return (
    <>
      <nav className="w-full bg-white shadow-md px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-green-600">Food Service</div>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <a href="/" className="hover:text-green-600 px-3 py-2 rounded-md">Home</a>
              <a href="/about" className="hover:text-green-600 px-3 py-2 rounded-md">About</a>
              <div className="relative">
                <button
                  onClick={() => setShowMoreMenu((s) => !s)}
                  className="hover:text-green-600 px-3 py-2 rounded-md"
                >
                  More
                </button>
                {showMoreMenu && (
                  <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-20">
                    <a href="/features" className="block px-4 py-2 text-sm hover:bg-gray-100">Features</a>
                    <a href="/pricing" className="block px-4 py-2 text-sm hover:bg-gray-100">Pricing</a>
                    <a href="/contact" className="block px-4 py-2 text-sm hover:bg-gray-100">Contact</a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">

            {/* Right side - Login / Profile */}
            <div className="relative">
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowProfileMenu((s) => !s)}
                    className="flex items-center gap-2 bg-green-50 border border-green-100 px-3 py-1 rounded-full text-sm"
                  >
                    <span className="w-8 h-8 rounded-full bg-green-300 flex items-center justify-center text-white text-sm uppercase">{(username || "U").charAt(0)}</span>
                    <span className="hidden sm:inline">{username}</span>
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-20">
                      <a href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</a>
                      <a href="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100">Orders</a>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => (window.location.href = "/#/login")}
                    className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
                  >
                    Login
                  </button>
                  <a href="/#/signup" className="px-3 py-2 border rounded-md text-sm hover:bg-gray-50">Sign up</a>
                </div>
              )}
            </div>

            {/* Mobile menu toggle (simple) */}
            <div className="md:hidden ml-2">
              <button
                onClick={() => {
                  // For a real app implement a mobile menu
                  alert("Open mobile menu (implement as needed)");
                }}
                className="p-2 rounded-md border"
              >
                <span className="sr-only">Open menu</span>
                ☰
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
