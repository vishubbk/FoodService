import {
  Bookmark,
  Home,
  LogOut,
  Moon,
  Sun,
  UserCircle, // <-- add this import
  Video,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { isDark, setIsDark } = useContext(AppContext);

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
  };

  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-16">
        {/* Logo */}
        <div className="h-16 w-16 flex items-center justify-center border-b border-white/10 shrink-0">
          <Video className={isDark ? "text-white" : "text-black"} size={28} />
        </div>
        <nav
          className={`h-full w-16 hover:w-56 transition-all duration-300 border-r z-50 rounded-xl group overflow-hidden ${
            isDark
              ? "bg-[#1d1c1c] border-white/10 text-white"
              : "bg-white border-black/10 text-black"
          }`}
        >
          {/* Nav Items */}
          <div className="flex flex-col gap-2 mt-4 px-2">
            <NavItem icon={<Home />} label="Home" />
            <NavItem icon={<Bookmark />} label="Saved" />
            <NavItem icon={<UserCircle />} label="Profile" />{" "}
            {/* Use profile icon */}
          </div>

          {/* Bottom Profile */}
          <div className="absolute bottom-4 w-full px-2">
            <button
              onClick={() => setIsDark((prev) => !prev)}
              className="w-full mb-3 px-3 py-2 text-xs rounded-md border flex items-center justify-center gap-2 hover:bg-black/10 dark:hover:bg-white/10"
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}{" "}
              {/* Sun and Moon icons */}

            </button>
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu((s) => !s)}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-white/10 text-white"
                >
                  <UserCircle
                    size={32}
                    className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-full p-1"
                  />{" "}
                  {/* Profile icon */}
                  <span className="hidden group-hover:block truncate">
                    {username}
                  </span>
                </button>

                {showProfileMenu && (
                  <div className="absolute left-16 bottom-0 w-40 bg-[#111] border border-white/10 rounded-md shadow-xl">
                    <button className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10">
                      Profile
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10">
                      Saved
                    </button>
                    <button
                      onClick={logout}
                      className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-white/10 flex items-center gap-2"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => (window.location.href = "/#/login")}
                className={`w-full px-3 py-2 text-sm rounded-md ${
                  isDark
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                Login
              </button>
            )}
          </div>
        </nav>
      </div>
      {/* page offset */}
      <div className="ml-16 group-hover:ml-56 transition-all duration-300"></div>
    </>
  );
};

const NavItem = ({ icon, label }) => (
  <a
    href="#"
    className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-black/10 dark:hover:bg-white/10"
  >
    <span className="shrink-0">{icon}</span>
    <span className="hidden group-hover:block text-sm">{label}</span>
  </a>
);

export default Navbar;
