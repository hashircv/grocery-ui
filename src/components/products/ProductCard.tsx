import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "./data/products";

type Props = {
  product: Product;
  categoryId?: number | string;
};

export default function ProductCard({ product, categoryId }: Props) {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const goToDetail = () => {
    if (!categoryId) return; // safety
    navigate(`/category/${categoryId}/product/${product.id}`);
  };

  return (
    <div
      onClick={goToDetail}
      className="cursor-pointer min-w-[180px] lg:max-w-[210px] max-w-[230px] bg-white rounded-2xl shadow-sm border border-gray-50 flex flex-col ml-4 overflow-hidden hover:shadow-md transition"
    >
      {/* Image */}
      <div className="w-full h-36 bg-gray-50 flex items-center justify-center p-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-3 gap-1">
        <div className="w-4 h-4 border-2 border-green-600 rounded-sm flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-green-600" />
        </div>

        <p className="text-sm font-medium text-gray-800 line-clamp-2">
          {product.name}
        </p>

        <p className="text-xs text-gray-500">{product.qty}</p>

        <p className="text-lg font-bold text-gray-900">
          ₹{product.price}
        </p>

        {/* Bulk pricing */}
        <div className="flex flex-col gap-0.5">
          {product.bulk?.map((b, i) => (
            <p key={i} className="text-xs text-blue-600 font-medium">
              {b}
            </p>
          ))}
        </div>

        {/* Add / Counter */}
        <div
          className="mt-3"
          onClick={(e) => e.stopPropagation()}
        >
          {count === 0 ? (
            <button
              onClick={() => setCount(1)}
              className="w-full border-2 border-red-400 rounded-xl px-4 py-2 text-red-500 font-bold text-sm hover:bg-red-50"
            >
              ADD +
            </button>
          ) : (
            <div className="w-full flex items-center justify-between border-2 border-red-400 rounded-xl px-3 py-2">
              <button
                onClick={() => setCount((c) => Math.max(0, c - 1))}
                className="text-red-500 font-bold text-lg"
              >
                −
              </button>
              <span className="font-bold">{count}</span>
              <button
                onClick={() => setCount((c) => c + 1)}
                className="text-red-500 font-bold text-lg"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
