import { useState, useEffect, useRef, useCallback } from "react";

const banners = [
  {
    title: "Pack, store & prep",
    subtitle: "Durable kitchen containers",
    image: "/container.png",
    bg: "bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400",
  },
  {
    title: "Fresh & Organic",
    subtitle: "Farm fresh vegetables",
    image: "/veggies.png",
    bg: "bg-gradient-to-br from-green-200 via-green-300 to-green-400",
  },
  {
    title: "Daily Essentials",
    subtitle: "Milk & grocery items",
    image: "/groceries.png",
    bg: "bg-gradient-to-br from-sky-200 via-sky-300 to-sky-400",
  },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(null);
  const autoplayRef = useRef(null);
  const total = banners.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  const resetAutoplay = useCallback(() => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(next, 4000);
  }, [next]);

  useEffect(() => {
    resetAutoplay();
    return () => clearInterval(autoplayRef.current);
  }, [resetAutoplay]);

  const onPointerDown = (e) => {
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX;
    setIsDragging(false);
  };
  const onPointerMove = (e) => {
    if (dragStartX.current === null) return;
    const dx = (e.clientX ?? e.touches?.[0]?.clientX ?? dragStartX.current) - dragStartX.current;
    if (Math.abs(dx) > 5) setIsDragging(true);
  };
  const onPointerUp = (e) => {
    if (dragStartX.current === null) return;
    const dx = (e.clientX ?? e.changedTouches?.[0]?.clientX ?? dragStartX.current) - dragStartX.current;
    if (Math.abs(dx) > 40) {
      dx < 0 ? next() : prev();
      resetAutoplay();
    }
    dragStartX.current = null;
    setTimeout(() => setIsDragging(false), 0);
  };

  const getOffset = (idx) => {
    let diff = idx - current;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 select-none">
      {/* Slide Track */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 260 }}
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
      >
        {banners.map((banner, idx) => {
          const offset = getOffset(idx);
          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 1;

          return (
            <div
              key={idx}
              onClick={() => {
                if (!isDragging && !isActive) {
                  setCurrent(idx);
                  resetAutoplay();
                }
              }}
              className="absolute top-0 h-full transition-all duration-500 ease-in-out"
              style={{
                left: "50%",
                width: "85%",
                transform: `translateX(calc(-50% + ${offset * 95}%)) scale(${isActive ? 1 : 0.96})`,
                opacity: isVisible ? (isActive ? 1 : 0.65) : 0,
                zIndex: isActive ? 10 : 5,
                cursor: isActive ? "grab" : "pointer",
                pointerEvents: isVisible ? "auto" : "none",
              }}
            >
              <div className={`${banner.bg} rounded-3xl shadow-lg flex items-center justify-between w-full h-full px-8`}>
                {/* Text */}
                <div className="max-w-[55%]">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                    {banner.title}
                  </h2>
                  <p className="text-base text-gray-700 mt-2">{banner.subtitle}</p>
                </div>

                {/* Image */}
                <img
                  src={banner.image}
                  alt={banner.title}
                  draggable={false}
                  className="w-24 lg:w-32 h-16 lg:h-20 object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrent(idx);
              resetAutoplay();
            }}
            className={`h-2 rounded-full transition-all duration-300 border-none cursor-pointer ${
              current === idx ? "w-6 bg-gray-900" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}