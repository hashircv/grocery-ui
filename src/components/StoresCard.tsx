import { useNavigate } from "react-router-dom";

export default function StoresSection() {
  const navigate = useNavigate();
  const stores = [
    { title: "Bakery store", bg: "bg-blue-200", img: "/images/bottle.jpg" },
    { title: "Packaging store", bg: "bg-orange-200", img: "/images/bottle.jpg" },
    { title: "Biryani store", bg: "bg-yellow-200", img: "/images/bottle.jpg" },
    { title: "Events & party store", bg: "bg-purple-200", img: "/images/bottle.jpg" },
    { title: "Sushi store", bg: "bg-orange-300", img: "/images/bottle.jpg" },
    { title: "Burger store", bg: "bg-amber-200", img: "/images/bottle.jpg" },
  ];

  return (
    <section className="mt-6">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 mb-4">
        <h2 className="text-2xl font-bold">Stores</h2>
        <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
          NEW
        </span>
      </div>

      <div
        className="
          grid
          grid-rows-2
          grid-flow-col
          auto-cols-[35%]
          gap-4
          px-4
          overflow-x-auto
          scrollbar-hide
          scroll-smooth
          md:grid-flow-row
          md:grid-rows-none
          md:grid-cols-6
        "
      >
        {stores.map((store, index) => (
          <div
            key={index}
            className={`${store.bg} h-32 rounded-2xl p-4 flex flex-col justify-between`}
            role="button"
            tabIndex={0}
            onClick={() => navigate("/category/2")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate("/category/2");
            }}
          >
            <h3 className="font-semibold text-sm text-center">{store.title}</h3>

            <div className="flex justify-center">
              <img
                src={store.img}
                alt={store.title}
                loading="lazy"
                decoding="async"
                className="h-16 object-contain rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
