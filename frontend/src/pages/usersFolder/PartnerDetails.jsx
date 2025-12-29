import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/Context";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";

const PartnerDetails = () => {
  const { id } = useParams();
  const { isDark } = useContext(AppContext);

  const [partnerDetails, setPartnerDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPartnerDetails = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/user/getFoodPartnerDetails/${id}`,
          { withCredentials: true }
        );

        setPartnerDetails(res.data.data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerDetails();
    console.log(PartnerDetails)
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading partner details...
      </div>
    );
  }

  if (!partnerDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Partner not found
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Navbar />

      <div className="max-w-5xl mx-auto pt-10 px-6">
        <div className="flex items-center gap-10">
          {/* Profile Avatar */}
          <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-5xl font-bold text-white">
            {partnerDetails.businessName?.charAt(0).toUpperCase()}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-2xl font-semibold">
                {partnerDetails.businessName}
              </h2>

              <button className="px-6 py-1.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
                Follow
              </button>

              <button
                className={`px-6 py-1.5 rounded-md text-sm font-medium ${
                  isDark
                    ? "bg-white/10 hover:bg-white/20"
                    : "bg-black/10 hover:bg-black/20"
                }`}
              >
                Message
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mb-3">
              <span>
                <b>0</b> Posts
              </span>
              <span>
                <b>{partnerDetails.connections}</b> Connections
              </span>
            </div>

            {/* Details */}
            <div className="text-sm leading-relaxed space-y-1">
              <p className="font-semibold">
                👤 Owner: {partnerDetails.ownerName}
              </p>

              <p>📍 Address: {partnerDetails.address || "Not available"}</p>

              <p>📞 Contact: {partnerDetails.contact}</p>

              <p className="text-blue-500">
                📧 {partnerDetails.email}
              </p>

              <p className="text-xs opacity-70 mt-2">
                Joined on{" "}
                {new Date(partnerDetails.createdAt).toDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          className={`flex justify-center gap-16 mt-12 border-t ${
            isDark ? "border-white/10" : "border-black/10"
          }`}
        >
          <Tab label="REELS" active />
        </div>

        {/* Placeholder Grid */}
        <div className="grid grid-cols-3 gap-1 mt-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-square bg-gray-800 flex items-center justify-center text-sm text-white"
            >
              Reel {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Tab = ({ label, active }) => (
  <div
    className={`py-3 text-sm font-medium cursor-pointer ${
      active ? "border-t-2 border-white" : "opacity-60"
    }`}
  >
    {label}
  </div>
);

export default PartnerDetails;
