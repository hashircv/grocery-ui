import { useState, useEffect, useRef, useCallback } from "react";
import type { MouseEvent, TouchEvent } from "react";

type BannerItem = {
  image: string;
  alt: string;
};

const banners: BannerItem[] = [
  {
    image: "images/banner_01.jpg",
    alt: "Banner 1",
  },
  {
    image: "images/banner_01.jpg",
    alt: "Banner 2",
  },
  {
    image: "images/banner_01.jpg",
    alt: "Banner 3",
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

  return (
    <div className="w-[80%] max-w-6xl mx-auto mt-10 select-none">
      {/* Slide Track */}
      <div
        className="relative w-full overflow-hidden h-44 sm:h-52 md:h-[260px]"
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
      >
        <div className="absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out">
          <img
            src={banners[current].image}
            alt={banners[current].alt}
            draggable={false}
            className="w-full h-full object-cover rounded-3xl shadow-lg"
          />
        </div>
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
