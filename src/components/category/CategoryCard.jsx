export default function CategoryCard({ title, image }) {
  return (
    <div className="bg-gray-200 rounded-2xl p-3 text-center hover:scale-105 transition">
      <img
        src={image}
        alt={title}
        className="w-full h-20 object-contain"
      />
      <p className="mt-2 text-sm font-medium">{title}</p>
    </div>
  );
}