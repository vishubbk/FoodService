import axios from "axios";
import { useState } from "react";

const API_BASE = import.meta.env.VITE_BASE_URL || "";

const FoodPartnerAddReel = () => {
  const [form, setForm] = useState({
    video: null,
    name: "",
    description: "",
    price: "",
    category: "",
    foodPartnerId: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      await axios.post(`${API_BASE}/api/food/addFood`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMsg("Reel added successfully!");
      setForm({
        video: null,
        name: "",
        description: "",
        price: "",
        category: "",
        foodPartnerId: "",
      });
    } catch (err) {
      setMsg(err?.response?.data?.message || "Error adding reel");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Food Reel</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="foodPartnerId"
          placeholder="Food Partner ID"
          value={form.foodPartnerId}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add Reel"}
        </button>
        {msg && <div className="text-center text-sm mt-2">{msg}</div>}
      </form>
    </div>
  );
};

export default FoodPartnerAddReel;
