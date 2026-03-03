import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";

const categories = [
  { title: "Your Menu Add-ons", image: "/images/categories/menu.png" },
  { title: "Fruits & Vegetables", image: "/images/categories/fruits.png" },
  { title: "Packaging Material", image: "/images/categories/packaging.png" },
  { title: "Dairy", image: "/images/categories/dairy.png" },
  { title: "Edible Oils", image: "/images/categories/oils.png" },
  { title: "Masala, Salt & Sugar", image: "/images/categories/masala.png" },
  { title: "Custom Packaging", image: "/images/categories/custom.png" },
  { title: "Chicken & Eggs", image: "/images/categories/chicken.png" },
  { title: "Frozen & Instant Food", image: "/images/categories/frozen.png" },
  { title: "Sauces & Seasoning", image: "/images/categories/sauces.png" },
  { title: "Canned & Imported Items", image: "/images/categories/canned.png" },
  { title: "Bakery & Chocolates", image: "/images/categories/bakery.png" },
  { title: "Cleaning & Consumables", image: "/images/categories/cleaning.png" },
  { title: "Pulses", image: "/images/categories/pulses.png" },
  { title: "Flours", image: "/images/categories/flours.png" },
  { title: "Beverages & Mixers", image: "/images/categories/beverages.png" },
  { title: "Mutton,Duck & Lamb", image: "/images/categories/meats.png" },
  { title: "Rice & Rice Products", image: "/images/categories/rice-products.png" },
  { title: "Fish,Prawns & Seafood", image: "/images/categories/seafood.png" },
  { title: "Fresh Cut & Peeled", image: "/images/categories/fresh-cut.png" },
  { title: "GT Chicken & Eggs", image: "/images/categories/chicken.png" },
  { title: "Kitchenware", image: "/images/categories/kitchenware.png" },
  { title: "Kitchen Appliances", image: "/images/categories/appliances.png" },
];

export default function CategoryGrid() {
  const navigate = useNavigate();
  return (
    <div className="px-4 mt-6">
      <h1 className="text-2xl font-bold mb-4">Shop by category</h1>

      <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, index) => (
          <CategoryCard
            key={index}
            {...cat}
            onClick={() => navigate("/category/2")}
          />
        ))}
      </div>
    </div>
  );
}
