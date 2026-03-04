import { useEffect } from "react";
import ProductSection from "./ProductSection";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCategories, fetchProductsByCategory } from "../../store/catalogSlice";

export default function ProductSections() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.catalog.categories);
  const categoriesLoading = useAppSelector(
    (state) => state.catalog.categoriesLoading
  );
  const productsByKey = useAppSelector((state) => state.catalog.productsByKey);
  const productsLoadingByKey = useAppSelector(
    (state) => state.catalog.productsLoadingByKey
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length === 0) return;
    categories.forEach((category) => {
      dispatch(fetchProductsByCategory(category.id));
    });
  }, [categories, dispatch]);

  return (
    <div className="w-full bg-gray-50 divide-y divide-gray-100 mt-6">
      {categoriesLoading && (
        <div className="px-4 py-6 text-sm text-gray-500">Loading products...</div>
      )}
      {categories.map((category) => {
        const key = `category:${category.id}`;
        const products = productsByKey[key] ?? [];
        const isLoading = Boolean(productsLoadingByKey[key]);
        if (!isLoading && products.length === 0) return null;

        return (
          <ProductSection
            key={category.id}
            category={{
              id: category.id,
              name: category.name,
              image: category.image,
            }}
            products={products}
          />
        );
      })}
    </div>
  );
}
