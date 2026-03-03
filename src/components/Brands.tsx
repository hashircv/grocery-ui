import { useNavigate } from "react-router-dom";

export default function Brands() {
  const navigate = useNavigate();
  const brands = [
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
        <h2 className="text-2xl font-bold">Trusted Brands</h2>
      </div>

      <div
        className="
          grid
          grid-rows-2
          grid-flow-col
          auto-cols-[35%]
          gap-4
          px-4
          scrollbar-hide
          overflow-x-auto
          scroll-smooth
          md:grid-flow-row
          md:grid-rows-none
          md:grid-cols-3
        "
      >
        {brands.map((store, index) => (
          <div
            key={index}
            className={`${store.bg} h-40 lg:h-60 rounded-2xl p-6 flex flex-col justify-between cursor-pointer`}
            role="button"
            tabIndex={0}
            onClick={() => navigate("/category/2")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate("/category/2");
            }}
          >
            <h3 className="font-semibold text-sm">{store.title}</h3>

            <div className="flex justify-center">
              <img
                src={store.img}
                alt={store.title}
                className="h-16 object-contain rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
