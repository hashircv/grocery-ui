import { useState } from "react";
import { useParams } from "react-router-dom";
import { sections } from "../../components/products/data/products";
import ProductCard from "../../components/products/ProductCard";

// ── per-category subcategories & filters ──────────────────────────────────────
const categoryMeta = {
  1: {
    subcategories: [
      { id: "all", label: "All", image: "" },
      { id: "brownies", label: "Brownies & Cakes", image: "" },
      { id: "chocolates", label: "Chocolates", image: "" },
      { id: "cookies", label: "Cookies", image: "" },
      { id: "pastries", label: "Pastries", image: "" },
    ],
    filters: ["Rated 4.0+", "Veg", "Non Veg", "Brand", "Eggless", "Frozen"],
  },
  2: {
    subcategories: [
      { id: "all", label: "All", image: "" },
      { id: "butter", label: "Butter & Ghee", image: "" },
      { id: "milk", label: "Milk & Cream", image: "" },
      { id: "cheese", label: "Cheese", image: "" },
      { id: "yogurt", label: "Curd & Yogurt", image: "" },
    ],
    filters: ["Rated 4.0+", "Veg", "Brand", "Amul", "Mother Dairy", "Type"],
  },
};

export default function ProductList() {
  const { id } = useParams();
  const section = sections.find((s) => s.id === Number(id));
  const meta = categoryMeta[Number(id)];

  const [activeSub, setActiveSub] = useState("all");
  const [activeFilters, setActiveFilters] = useState([]);

  if (!section) return <p className="p-4">Category not found.</p>;

  const subcategories = meta?.subcategories ?? [{ id: "all", label: "All", image: "" }];
  const filters = meta?.filters ?? [];

  const toggleFilter = (f) =>
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );

  return (
    <div className="flex w-full bg-white p-3" style={{ height: "calc(100vh - 64px)" }}>
      {/* ── Left Sidebar ── */}
      <aside className="w-30 lg:w-60 shrink-0 bg-gray-50 border-r border-gray-100 flex flex-col py-2 overflow-y-auto p-6 rounded-xl bg-white shadow-grey">
        {subcategories.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setActiveSub(sub.id)}
            className={`flex flex-col lg:flex-row items-center gap-1 px-2 py-3 text-center transition-colors relative ${
              activeSub === sub.id
                ? "bg-white text-gray-900 font-semibold"
                : "text-gray-500"
            }`}
          >
            {/* Active indicator */}
            {activeSub === sub.id && (
              <span className="absolute left-0 top-2 bottom-2 w-1 bg-red-500 rounded-r-full" />
            )}

            {/* Icon circle */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden ${
                activeSub === sub.id ? "bg-red-50" : "bg-gray-200"
              }`}
            >
              {sub.image ? (
                <img src={sub.image} alt={sub.label} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl">
                  {sub.id === "all" ? "🔲" :
                   sub.id === "brownies" ? "🍰" :
                   sub.id === "chocolates" ? "🍫" :
                   sub.id === "cookies" ? "🍪" :
                   sub.id === "pastries" ? "🥐" :
                   sub.id === "butter" ? "🧈" :
                   sub.id === "milk" ? "🥛" :
                   sub.id === "cheese" ? "🧀" :
                   sub.id === "yogurt" ? "🫙" : "📦"}
                </span>
              )}
            </div>

            <span className="text-xs leading-tight">{sub.label}</span>
          </button>
        ))}
      </aside>

      {/* ── Right Content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Filter chips — sticky, does not scroll */}
        {filters.length > 0 && (
          <div className="flex gap-2 overflow-x-auto px-3 py-3 scrollbar-hide border-b border-gray-100 shrink-0">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => toggleFilter(f)}
                className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                  activeFilters.includes(f)
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {f === "Rated 4.0+" && <span>⭐</span>}
                {f}
                {(f === "Brand" || f === "Type") && <span>∨</span>}
              </button>
            ))}
          </div>
        )}

        {/* Product grid — only this section scrolls */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {section.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}