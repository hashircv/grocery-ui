import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import type { Product } from "./types";

type Props = {
  category: {
    id: string;
    name: string;
    image: string;
  };
  products: Product[];
};

export default function ProductSection({ category, products }: Props) {
  const navigate = useNavigate();

  return (
    <div className="w-full px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
            <img
              src={category.image}
              alt={category.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-md"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">
              {category.name}
            </h2>
          </div>
        </div>

        <button
          onClick={() => navigate(`/category/${category.id}`)}
          className="text-red-500 font-bold text-sm shrink-0"
        >
          See all
        </button>
      </div>

      {/* Horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            categoryId={category.id}
          />
        ))}
      </div>
    </div>
  );
}
