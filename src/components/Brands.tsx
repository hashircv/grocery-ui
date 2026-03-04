import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchBrands } from "../store/catalogSlice";

export default function Brands() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const brands = useAppSelector((state) => state.catalog.brands);
  const brandsLoading = useAppSelector((state) => state.catalog.brandsLoading);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  if (!brandsLoading && brands.length === 0) return null;

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
          md:grid-cols-6
        "
      >
        {brandsLoading && (
          <div className="text-sm text-gray-500 px-4">Loading brands...</div>
        )}
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-gray-50 h-32 rounded-2xl p-4 flex flex-col justify-between cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => navigate("/category/2")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate("/category/2");
            }}
          >
            <h3 className="font-semibold text-sm text-center">{brand.name}</h3>

            <div className="flex justify-center">
              <img
                src={brand.image}
                alt={brand.name}
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
