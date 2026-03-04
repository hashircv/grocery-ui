import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchStores } from "../store/catalogSlice";

export default function StoresSection() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const stores = useAppSelector((state) => state.catalog.stores);
  const storesLoading = useAppSelector((state) => state.catalog.storesLoading);

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  if (!storesLoading && stores.length === 0) return null;

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
        {storesLoading && (
          <div className="text-sm text-gray-500 px-4">Loading stores...</div>
        )}
        {stores.map((store) => (
          <div
            key={store.id}
            className="bg-gray-50 h-32 rounded-2xl p-4 flex flex-col justify-between"
            role="button"
            tabIndex={0}
            onClick={() => navigate("/category/2")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate("/category/2");
            }}
          >
            <h3 className="font-semibold text-sm text-center">{store.name}</h3>

            <div className="flex justify-center">
              <img
                src={store.image}
                alt={store.name}
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
