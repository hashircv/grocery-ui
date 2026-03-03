import { useState, useEffect, useRef, useCallback } from "react";
import type { MouseEvent, TouchEvent } from "react";

type BannerItem = {
  title: string;
  subtitle: string;
  image: string;
  bg: string;
};

const banners: BannerItem[] = [
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
  const dragStartX = useRef<number | null>(null);
  const autoplayRef = useRef<number | null>(null);
  const total = banners.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current !== null) {
      window.clearInterval(autoplayRef.current);
    }
    autoplayRef.current = window.setInterval(next, 3000);
  }, [next]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayRef.current !== null) {
        window.clearInterval(autoplayRef.current);
      }
    };
  }, [resetAutoplay]);

  const isTouchEvent = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ): e is TouchEvent<HTMLDivElement> => "touches" in e;

  const getClientX = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    if (isTouchEvent(e)) return e.touches[0]?.clientX;
    return e.clientX;
  };

  const getEndClientX = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    if ("changedTouches" in e) return e.changedTouches[0]?.clientX;
    if (isTouchEvent(e)) return e.touches[0]?.clientX;
    return e.clientX;
  };

  const onPointerDown = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    dragStartX.current = getClientX(e) ?? null;
    setIsDragging(false);
  };

  const onPointerMove = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    if (dragStartX.current === null) return;
    const dx = (getClientX(e) ?? dragStartX.current) - dragStartX.current;
    if (Math.abs(dx) > 5) setIsDragging(true);
  };

  const onPointerUp = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    if (dragStartX.current === null) return;
    const dx = (getEndClientX(e) ?? dragStartX.current) - dragStartX.current;
    if (Math.abs(dx) > 40) {
      dx < 0 ? next() : prev();
      resetAutoplay();
    }
    dragStartX.current = null;
    setTimeout(() => setIsDragging(false), 0);
  };

  const getOffset = (idx: number) => {
    let diff = idx - current;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div className="w-[80%] max-w-6xl mx-auto mt-10 select-none">
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
