import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";

const apiCategories = [
  {
    id: "6",
    name: "Groceries",
    image:
      "https:/vpmadmin.itdeck.online/img/live/img/17d3da9f-bf47-41ca-9629-8ee2d54a92ac.jpg",
  },
  {
    id: "5",
    name: "Ingredients",
    image:
      "https:/vpmadmin.itdeck.online/img/live/img/d339da39-35c6-4cf6-8fbb-5a558054e241.jpg",
  },
  {
    id: "4",
    name: "Beverages",
    image:
      "https:/vpmadmin.itdeck.online/img/live/img/90b20c5a-5403-45d0-991a-87ebf6682b52.webp",
  },
  {
    id: "3",
    name: "Disposable Packaging",
    image:
      "https:/vpmadmin.itdeck.online/img/live/img/3d463e6c-6565-409b-83a6-69a422c7b0af.jpg",
  },
  {
    id: "2",
    name: "Fruit crush",
    image:
      "https:/vpmadmin.itdeck.online/img/live/img/2f987438-629f-4829-bacf-f29d1453fae1.webp",
  },
  {
    id: "1",
    name: "Masala Salt&Sugar",
    image:
      "https:/vpmadmin.itdeck.online/img/live/img/b3a479d2-3e31-4c47-87a3-ce8497d60fdd.jpg",
  },
];

const normalizeImageUrl = (url: string) => {
  if (url.startsWith("https:/") && !url.startsWith("https://")) {
    return url.replace("https:/", "https://");
  }
  if (url.startsWith("http:/") && !url.startsWith("http://")) {
    return url.replace("http:/", "http://");
  }
  return url;
};

export default function CategoryGrid() {
  const navigate = useNavigate();
  return (
    <div className="px-4 mt-6">
      <h1 className="text-2xl font-bold mb-4">Shop by category</h1>

      <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
        {apiCategories.map((cat) => (
          <CategoryCard
            key={cat.id}
            title={cat.name}
            image={normalizeImageUrl(cat.image)}
            onClick={() => navigate(`/category/${cat.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
