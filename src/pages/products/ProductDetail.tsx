import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { categoryId, productId } = useParams<{
    categoryId: string;
    productId: string;
  }>();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          Product details
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Product data is not loaded from the API yet.
        </p>
        <div className="mt-6 text-sm text-gray-600">
          <div>Category ID: {categoryId ?? "-"}</div>
          <div>Product ID: {productId ?? "-"}</div>
        </div>
      </div>
    </div>
  );
}
