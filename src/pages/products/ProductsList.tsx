import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/products/ProductCard";
import type { Product } from "../../components/products/data/products";

// ── per-category subcategories & filters ──────────────────────────────────────
type Subcategory = {
  id: string;
  label: string;
  image: string;
};

type CategoryMeta = {
  filters: string[];
};

const categoryMeta: Record<number, CategoryMeta> = {
  1: {
    filters: ["Rated 4.0+", "Veg", "Non Veg", "Brand", "Eggless", "Frozen"],
  },
  2: {
    filters: ["Rated 4.0+", "Veg", "Brand", "Amul", "Mother Dairy", "Type"],
  },
};

type SubcategoryApiItem = {
  id: string;
  name: string;
  image?: string;
};

type SubcategoryApiResponse = {
  success: boolean;
  data?: {
    items?: SubcategoryApiItem[];
  };
};

type ProductVariantApiItem = {
  id: string;
  price?: string;
  offerPrice?: string;
  quantity?: number;
  uom?: string;
  image?: string;
};

type ProductApiItem = {
  id: string;
  product_name: string;
  image?: string;
  variants?: ProductVariantApiItem[];
};

type ProductApiResponse = {
  success: boolean;
  data?: {
    items?: ProductApiItem[];
  };
};

const normalizeImageUrl = (url: string) => {
  if (url.startsWith("https:/") && !url.startsWith("https://")) {
    return url.replace("https:/", "https://");
  }
  if (url.startsWith("http:/") && !url.startsWith("http://")) {
    return url.replace("http:/", "http://");
  }
  return url;
};

export default function ProductList() {
  const { id } = useParams<{ id: string }>();
  const meta = categoryMeta[Number(id)];

  const [activeSub, setActiveSub] = useState<string>("all");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([
    { id: "all", label: "All", image: "" },
  ]);
  const [subcategoriesLoading, setSubcategoriesLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);

  const filters = meta?.filters ?? [];

  const toggleFilter = (f: string) =>
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    const loadProducts = async () => {
      setProductsLoading(true);
      try {
        const categoryId = activeSub === "all" ? id : "";
        const subCategoryId = activeSub === "all" ? "" : activeSub;
        const url = `https://vpmadmin.itdeck.online/user/products/list/1?search=&categoryId=${categoryId}&subCategoryId=${subCategoryId}&brandId=null&storeId=null`;
        const response = await fetch(url);
        const payload = (await response.json()) as ProductApiResponse;
        if (!cancelled && payload.success) {
          const items = payload.data?.items ?? [];
          const mapped: Product[] = [];
          items.forEach((item) => {
            const variants = item.variants ?? [];
            if (variants.length === 0) {
              mapped.push({
                id: item.id,
                name: item.product_name,
                qty: "",
                price: 0,
                image: item.image ? normalizeImageUrl(item.image) : "",
              });
              return;
            }

            variants.forEach((variant) => {
              const priceRaw = variant.offerPrice ?? variant.price ?? "0";
              const price = Number(priceRaw);
              const qty =
                variant.quantity && variant.uom
                  ? `${variant.quantity} ${variant.uom}`
                  : "";
              mapped.push({
                id: `${item.id}-${variant.id}`,
                name: item.product_name,
                qty,
                price: Number.isNaN(price) ? 0 : price,
                image: normalizeImageUrl(
                  variant.image || item.image || ""
                ),
              });
            });
          });
          setProducts(mapped);
        }
      } catch {
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setProductsLoading(false);
      }
    };

    loadProducts();
    return () => {
      cancelled = true;
    };
  }, [id, activeSub]);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    const loadSubcategories = async () => {
      setSubcategoriesLoading(true);
      setSubcategories([{ id: "all", label: "All", image: "" }]);
      setActiveSub("all");
      try {
        const response = await fetch(
          `https://vpmadmin.itdeck.online/user/sub_category/list?category_id=${id}`
        );
        const payload = (await response.json()) as SubcategoryApiResponse;
        if (!cancelled && payload.success) {
          const items = payload.data?.items ?? [];
          const mapped = items.map((item) => ({
            id: item.id,
            label: item.name,
            image: item.image ? normalizeImageUrl(item.image) : "",
          }));
          setSubcategories([{ id: "all", label: "All", image: "" }, ...mapped]);
          setActiveSub("all");
        }
      } catch {
        if (!cancelled) {
          setSubcategories([{ id: "all", label: "All", image: "" }]);
          setActiveSub("all");
        }
      } finally {
        if (!cancelled) setSubcategoriesLoading(false);
      }
    };

    loadSubcategories();
    return () => {
      cancelled = true;
    };
  }, [id]);

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
