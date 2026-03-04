import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/products/ProductCard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchProductsByCategory,
  fetchProductsBySubcategory,
  fetchSubcategories,
} from "../../store/catalogSlice";

// ── per-category subcategories & filters ──────────────────────────────────────
type Subcategory = {
  id: string;
  label: string;
  image: string;
};

export default function ProductList() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const subcategoriesByCategory = useAppSelector(
    (state) => state.catalog.subcategoriesByCategory
  );
  const subcategoriesLoadingByCategory = useAppSelector(
    (state) => state.catalog.subcategoriesLoadingByCategory
  );
  const productsByKey = useAppSelector((state) => state.catalog.productsByKey);
  const productsLoadingByKey = useAppSelector(
    (state) => state.catalog.productsLoadingByKey
  );

  const [activeSub, setActiveSub] = useState<string>("all");

  useEffect(() => {
    if (!id) return;
    setActiveSub("all");
    dispatch(fetchSubcategories(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (!id) return;
    if (activeSub === "all") {
      dispatch(fetchProductsByCategory(id));
    } else {
      dispatch(fetchProductsBySubcategory(activeSub));
    }
  }, [activeSub, id, dispatch]);

  const subcategories: Subcategory[] = useMemo(() => {
    const items = subcategoriesByCategory[id ?? ""] ?? [];
    return [{ id: "all", label: "All", image: "" }, ...items];
  }, [subcategoriesByCategory, id]);

  const subcategoriesLoading = Boolean(
    id && subcategoriesLoadingByCategory[id]
  );

  const productsKey = activeSub === "all" ? `category:${id}` : `sub:${activeSub}`;
  const products = productsByKey[productsKey] ?? [];
  const productsLoading = Boolean(productsLoadingByKey[productsKey]);

  return (
    <div className="flex w-full bg-white p-3" style={{ height: "calc(100vh - 64px)" }}>
      {/* ── Left Sidebar ── */}
      <aside className="w-30 lg:w-60 shrink-0 bg-gray-50 border-r border-gray-100 flex flex-col py-2 overflow-y-auto p-6 rounded-xl bg-white shadow-grey">
        {subcategoriesLoading && (
          <div className="px-2 py-3 text-xs text-gray-400">Loading...</div>
        )}
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
                <img
                  src={sub.image}
                  alt={sub.label}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
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
        {/* Product grid — only this section scrolls */}
        <div className="flex-1 overflow-y-auto p-3">
          {productsLoading ? (
            <p className="text-sm text-gray-500">Loading products...</p>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} categoryId={id} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
