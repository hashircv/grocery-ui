import { sections } from "./data/products";
import ProductSection from "./ProductSection";

export default function ProductSections() {
  return (
    <div className="w-full bg-gray-50 divide-y divide-gray-100 mt-6">
      {sections.map((section) => (
        <ProductSection key={section.id} section={section} />
      ))}
    </div>
  );
}
