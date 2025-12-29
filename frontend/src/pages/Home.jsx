import axios from "axios";
import { useContext } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/Context";
import { Link } from "react-router-dom";


// Improved Reels with proactive preloading + HLS support
const Home = () => {
  const API_BASE = import.meta.env.VITE_BASE_URL || "";
  const { isDark } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const limit = 3; // smaller page for smoother experience
  const [hasMore, setHasMore] = useState(true);

  const containerRef = useRef(null);
  const videoRefs = useRef(new Map());

  const fetchPage = useCallback(
    async (p = 1) => {
      try {
        if (p === 1) setLoading(true);
        else setLoadingMore(true);
        setError("");

        const res = await axios.get(
          `${API_BASE}/api/user/getAllItems?page=${p}&limit=${limit}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        const data = res?.data?.data ?? res?.data ?? [];
        if (!Array.isArray(data))
          throw new Error("Unexpected response shape from server");

        setItems((prev) => (p === 1 ? data : [...prev, ...data]));
        if (data.length < limit) setHasMore(false);
      } catch (err) {
        console.error("Fetch page error:", err);
        setError(
          err?.response?.data?.message || err?.message || "Failed to load items"
        );
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [API_BASE]
  );

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  useEffect(() => {
    if (!containerRef.current) return;

    // bigger rootMargin to preload nearby videos before they enter viewport
    const options = {
      root: containerRef.current,
      rootMargin: "300px 0px",
      threshold: 0.5,
    };

    const onIntersect = (entries) => {
      entries.forEach((entry) => {
        const reel = entry.target;
        const vid = reel.querySelector("video");
        if (!vid) return;
        const dataSrc = vid.dataset.src;

        if (entry.isIntersecting) {
          // Pause all other videos
          videoRefs.current.forEach((otherVid, key) => {
            if (otherVid !== vid) {
              try {
                otherVid.pause();
              } catch (e) {}
              otherVid.muted = true;
            }
          });

          // ensure metadata is fetched quickly
          if (!vid.src && dataSrc) {
            vid.preload = "metadata";
            // assign src and load
            vid.src = dataSrc;
            vid.load();
          }

          // play muted; then user can unmute on tap
          vid.muted = true;
          vid.play().catch(() => {});

          // proactively preload next video (if any)
          const next = reel.nextElementSibling;
          if (next) {
            const nextV = next.querySelector("video");
            if (nextV && !nextV.src && nextV.dataset.src) {
              nextV.preload = "metadata";
              nextV.src = nextV.dataset.src;
              // do not call load() aggressively for too many videos; metadata is enough
            }
          }
        } else {
          // pause and remove src to free resources
          try {
            vid.pause();
          } catch (e) {}
          if (vid.src) {
            vid.removeAttribute("src");
            vid.load();
          }
        }
      });
    };

    const observer = new IntersectionObserver(onIntersect, options);
    const nodes = containerRef.current.querySelectorAll(".reel-item");
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [items]);

  // infinite scroll sentinel
  const sentinelRef = useRef(null);
  useEffect(() => {
    if (!sentinelRef.current || !containerRef.current) return;
    if (!hasMore) return;
    const opt = {
      root: containerRef.current,
      rootMargin: "0px",
      threshold: 0.3,
    };
    const loadMore = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setPage((p) => p + 1);
      });
    };
    const obs = new IntersectionObserver(loadMore, opt);
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [hasMore]);

  useEffect(() => {
    if (page !== 1) fetchPage(page);
  }, [page, fetchPage]);

  // handle user play/unmute
  const handleVideoClick = (id) => {
    const vid = videoRefs.current.get(id);
    if (!vid) return;
    // Pause all other videos
    videoRefs.current.forEach((otherVid, key) => {
      if (otherVid !== vid) {
        try {
          otherVid.pause();
        } catch (e) {}
        otherVid.muted = true;
      }
    });
    if (vid.paused) {
      vid.muted = false;
      vid.play().catch(() => {});
    } else vid.pause();
  };

  return (
   <div
      className={`h-screen flex flex-col transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <div
          ref={containerRef}
          className="reels-scroll h-[95vh] mt-5 rounded-2xl w-90 m-auto overflow-y-scroll snap-y snap-mandatory overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {loading ? (
            <div className="h-screen flex items-center justify-center">
              Loading...
            </div>
          ) : error ? (
            <div className="h-screen flex items-center justify-center text-red-600">
              {error}
            </div>
          ) : items.length === 0 ? (
            <div className="h-screen flex items-center justify-center">
              No items found.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item._id || item.id}
                className="reel-item snap-start h-screen w-full bg-black flex justify-center overflow-hidden"
              >
                <div className="relative h-full w-full max-w-[420px] mx-auto overflow-hidden flex items-center justify-center">
                  {item.video ? (
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current.set(item._id || item.id, el);
                        else videoRefs.current.delete(item._id || item.id);
                      }}
                      data-src={item.video}
                      playsInline
                      muted
                      controls={false}
                      loop
                      className="absolute inset-0 w-full h-full object-cover"
                      onClick={() => handleVideoClick(item._id || item.id)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
                      No preview
                    </div>
                  )}
                  {/* Overlay for better text visibility */}
                  <Link to={`/partner/details/${item.foodPartner?._id || item.foodPartner}`}>
                    <div className="absolute bottom-15 left-0 w-full px-4">
                      <h3 className="font-semibold text-lg text-white">
                        {item.name || "Untitled"}
                      </h3>

                    {item.description && (
                      <p className="text-sm text-white/90">
                        {item.description}
                      </p>
                    )}
                  </div></Link>
                </div>
              </div>
            ))
          )}

          <div
            ref={sentinelRef}
            className="h-24 flex items-center justify-center"
          >
            {loadingMore ? (
              <span>Loading more...</span>
            ) : hasMore ? (
              <span>Scroll to load more</span>
            ) : (
              <span>No more items</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
