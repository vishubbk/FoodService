import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const FoodPartnerSignUp = () => {
  const [loader, setLoader] = useState(false);
  const [form, setForm] = useState({
    ownerName: "",
    businessName: "",
    email: "",
    password: "",
    contact: "",
    address: "",
  });
  const API_BASE = import.meta.env.VITE_BASE_URL || "";
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const res = await axios.post(
        `${API_BASE}/api/foodPartner/register`,
        {
          ownerName: form.ownerName,
          businessName: form.businessName,
          email: form.email,
          password: form.password,
          contact: form.contact,
          address: form.address,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // ✅ important if backend sets cookies
        }
      );
      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (error) {
      console.error(error.message);
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

      {/* center div */}

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div
          className="w-full max-w-lg p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl text-white max-h-[80vh] overflow-y-auto no-scrollbar"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex gap-3 mb-6">
            <Link to="/login" className="flex-1">
              <button
                type="button"
                className="w-full py-2 rounded-xl bg-white/20 border border-white/30 text-white font-medium hover:bg-white/30 transition"
              >
                User Login
              </button>
            </Link>

            <Link to="/foodPartner/login" className="flex-1">
              <button
                type="button"
                className="w-full py-2 rounded-xl bg-indigo-500/70 border border-white/30 text-white font-medium hover:bg-indigo-500 transition"
              >
                Partner Login
              </button>
            </Link>
          </div>
          <h2 className="text-3xl font-semibold mb-2">Food Partner Sign Up</h2>
          <p className="text-white/70 mb-6 text-sm">
            Create your restaurant partner account
          </p>

          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Owner Name</label>
              <input
                type="text"
                name="ownerName"
                value={form.ownerName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/20 focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="My Restaurant"
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/20 focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/20 focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/20 focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">contact Number</label>
              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/20 focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Address</label>
              <textarea
                name="address"
                minLength={50}
                maxLength={100}
                value={form.address}
                onChange={handleChange}
                placeholder="Full restaurant address"
                className="w-full px-4 py-3 min-h-15 max-h-60 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/20 focus:ring-2 focus:ring-indigo-300 outline-none"
              />
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
              {loader ? "Creating..." : "Create Partner Account"}
            </button>
          </form>
        </div>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default FoodPartnerSignUp;
