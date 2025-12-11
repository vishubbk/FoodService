import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const FoodPartnerLogin = () => {
  const [loader, setLoader] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const API_BASE = import.meta.env.VITE_BASE_URL || "";
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoader(true);
      const res = await axios.post(
        `${API_BASE}/api/foodPartner/login`,
        {
          email: form.email,
          password: form.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // store token if provided
      if (res?.data?.token) {
        if (form.remember) localStorage.setItem("token", res.data.token);
        else sessionStorage.setItem("token", res.data.token);
      }

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err.message ||
        "Login failed. Try again.";
      setError(msg);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="w-screen min-h-screen relative">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1374&auto=format&fit=crop"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div
          className="w-full max-w-md p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl text-white max-h-[80vh] overflow-y-auto no-scrollbar"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* switch User  */}
          <div className="flex gap-3 mb-6">
                      <Link to="/SignUp" className="flex-1">
                        <button
                          type="button"
                          className="w-full py-2 rounded-xl bg-white/20 border border-white/30 text-white font-medium hover:bg-white/30 transition"
                        >
                          User SignUp
                        </button>
                      </Link>

                      <Link to="/foodPartner/signup" className="flex-1">
                        <button
                          type="button"
                          className="w-full py-2 rounded-xl bg-indigo-500/70 border border-white/30 text-white font-medium hover:bg-indigo-500 transition"
                        >
                          Partner SignUp
                        </button>
                      </Link>
                    </div>
          <h2 className="text-2xl font-semibold mb-1">Welcome back</h2>
          <p className="text-white/70 mb-6 text-sm">Sign in to access your Food Partner dashboard</p>

          {error && <div className="mb-4 px-3 py-2 rounded-md bg-red-900/30 text-red-200 text-sm">{error}</div>}

          <form onSubmit={submitHandler} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@restaurant.com"
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/20 focus:ring-2 focus:ring-indigo-300 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPwd ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/20 focus:ring-2 focus:ring-indigo-300 outline-none"
                  required
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

              <Link to="/forgot" className="text-sm">
                <span className="inline-block px-3 py-1 rounded-full bg-white/8 border border-white/12 backdrop-blur-sm text-white/90 hover:bg-white/12 transition">
                  Forgot?
                </span>
              </Link>
            </div>

            <button
              type="submit"
              disabled={loader}
              className="
                w-full py-3 mt-2 rounded-xl
                bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                shadow-lg font-semibold
                hover:brightness-110 transition-all
                disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-75
              "
            >
              {loader ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="flex items-center gap-3 justify-center text-sm text-white/60 mb-4">
              <span className="h-px w-12 bg-white/6" aria-hidden="true"></span>
              <span>or sign in with</span>
              <span className="h-px w-12 bg-white/6" aria-hidden="true"></span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button aria-label="Sign in with Google" className="w-10 h-10 rounded-full bg-white/6 border border-white/8 flex items-center justify-center text-white/80 hover:bg-white/8 transition">G</button>
              <button aria-label="Sign in with Apple" className="w-10 h-10 rounded-full bg-white/6 border border-white/8 flex items-center justify-center text-white/80 hover:bg-white/8 transition"></button>
              <button aria-label="Sign in with Twitter" className="w-10 h-10 rounded-full bg-white/6 border border-white/8 flex items-center justify-center text-white/80 hover:bg-white/8 transition">t</button>
            </div>

            <p className="mt-6 text-center text-sm text-white/60">
              Don't have an account?{" "}
              <Link to="/food-partner/signup" className="text-white underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* hide scrollbar but keep scroll functional */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default FoodPartnerLogin;
