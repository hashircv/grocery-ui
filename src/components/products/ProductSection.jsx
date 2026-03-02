import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
export default function ProductSection({ section }) {
  const navigate = useNavigate();
  return (
    <div className="w-full px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
            <img
              src={section.image}
              alt={section.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">
              {section.title}
            </h2>
            <p className="text-sm text-gray-500">{section.subtitle}</p>
          </div>
        </div>
       <button
      onClick={() => navigate(`/category/${section.id}`)}
      className="text-red-500 font-bold text-sm shrink-0"
    >
      See all
    </button>
      </div>

      {/* Horizontally scrollable cards */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {section.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
