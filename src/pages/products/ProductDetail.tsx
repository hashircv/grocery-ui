import { useParams } from "react-router-dom";
import { sections } from "../../components/products/data/products";

export default function ProductDetail() {
  const { categoryId, productId } = useParams<{
    categoryId: string;
    productId: string;
  }>();

  // Find category
  const category = sections.find(
    (sec) => String(sec.id) === String(categoryId)
  );

  // Find product inside category
  const product = category?.products.find(
    (item) => String(item.id) === String(productId)
  );

  if (!product) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Product not found
      </div>
    );
  }
  const bulk = product.bulk ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* LEFT SIDE - IMAGE */}
        <div className="lg:w-1/2 w-full flex justify-center">
          <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-md bg-white">
            <img
              src={product.image || "/images/placeholder.png"}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>

        {/* RIGHT SIDE - DETAILS */}
        <div className="lg:w-1/2 w-full space-y-8">
          
          {/* Title */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>
            <p className="text-gray-500 mt-2">
              {product.qty}
            </p>
          </div>

          {/* Price Section */}
          <div className="border rounded-2xl p-6 shadow-sm bg-white">
            <p className="text-3xl font-bold text-gray-900">
              ₹{product.price}
            </p>

            {/* Bulk Pricing */}
            {bulk.length > 0 && (
              <div className="mt-3 space-y-1">
                {bulk.map((item, index) => (
                  <p key={index} className="text-gray-500 text-sm">
                    {item}
                  </p>
                ))}
              </div>
            )}

            <button className="mt-5 px-10 py-3 border border-red-400 text-red-500 font-bold rounded-xl hover:bg-red-50 transition">
              ADD +
            </button>
          </div>

          {/* Category Info */}
          <div>
            <h2 className="text-2xl font-bold mb-3">
              Product details
            </h2>
            <p className="text-gray-600 leading-relaxed">
              This product belongs to <b>{category?.title ?? "this"}</b> category.
              Premium quality item curated for your menu.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
