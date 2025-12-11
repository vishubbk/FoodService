import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const API_BASE = import.meta.env.VITE_BASE_URL|| "";
   const navigate = useNavigate();


  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 4) e.password = "Password must be 4+ characters";
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eobj = validate();
    setErrors(eobj);
    if (Object.keys(eobj).length) return;
    setLoading(true);

    try {

      const res = await axios.post(`${API_BASE}/api/user/login`, {
        email: form.email,
        password: form.password,
      },
      {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // ✅ important if backend sets cookies

        }
    );
      localStorage.setItem("token", res.data.token);

      navigate("/")


    } catch (err) {
      console.error("Login error:", err);
      // Prefer to show friendly message from backend when available
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err.message ||
        "Login failed. Try again.";
      setErrors((prev) => ({ ...prev, form: msg }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen relative">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1633855776455-911ba8a6353b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="abstract background"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Center container */}
      <div className="relative z-10 flex items-center justify-center min-h-full px-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="p-8 rounded-2xl bg-white/6 border border-white/10 backdrop-blur-md shadow-2xl text-white">

          <div className="flex gap-3 mb-6">
                                <Link to="/SignUp" className="flex-1">
                                  <button
                                    type="button"
                                    className="w-full py-2 rounded-xl bg-white/20 border border-white/30 text-white font-medium hover:bg-white/30 transition"
                                  >
                                    User SignUp
                                  </button>
                                </Link>

                                <Link to="/foodPartner/SignUp" className="flex-1">
                                  <button
                                    type="button"
                                    className="w-full py-2 rounded-xl bg-indigo-500/70 border border-white/30 text-white font-medium hover:bg-indigo-500 transition"
                                  >
                                    Partner SignUp
                                  </button>
                                </Link>
                              </div>
            <header className="mb-6">
              <h1 className="text-2xl font-semibold">Welcome back</h1>
              <p className="text-sm text-white/70 mt-1">Sign in to continue to FoodService</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {errors.form && (
                <div className="text-sm text-red-300 mb-2">{errors.form}</div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full rounded-xl px-4 py-3 bg-white/6 placeholder-white/60 text-white border ${
                    errors.email ? "border-red-400" : "border-white/10"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-300">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPwd ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full rounded-xl px-4 py-3 bg-white/6 placeholder-white/60 text-white border ${
                      errors.password ? "border-red-400" : "border-white/10"
                    } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/70 hover:text-white/90"
                    aria-label={showPwd ? "Hide password" : "Show password"}
                  >
                    {showPwd ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="mt-1 text-xs text-red-300">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm text-white/80">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-white/20 bg-white/5"
                  />
                  <span>Remember me</span>
                </label>

                <a href="#forgot" className="text-sm">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/8 border border-white/12 backdrop-blur-sm text-white/90 hover:bg-white/12 transition">
                    Forgot password?
                  </span>
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-semibold shadow-lg hover:brightness-105 transition disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <div className="flex items-center gap-3 justify-center text-sm text-white/60 mb-4">
                <span className="h-px w-12 bg-white/6" aria-hidden="true"></span>
                <span>or continue with</span>
                <span className="h-px w-12 bg-white/6" aria-hidden="true"></span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  aria-label="Sign in with Google"
                  className="w-10 h-10 rounded-full bg-white/6 border border-white/8 flex items-center justify-center text-white/80 hover:bg-white/8 transition"
                >
                  G
                </button>
                <button
                  aria-label="Sign in with Apple"
                  className="w-10 h-10 rounded-full bg-white/6 border border-white/8 flex items-center justify-center text-white/80 hover:bg-white/8 transition"
                >
                  
                </button>
                <button
                  aria-label="Sign in with Twitter"
                  className="w-10 h-10 rounded-full bg-white/6 border border-white/8 flex items-center justify-center text-white/80 hover:bg-white/8 transition"
                >
                  t
                </button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
