type Props = {
  title: string;
  image: string;
  onClick?: () => void;
};

export default function CategoryCard({ title, image, onClick }: Props) {
  return (
    <div
      className="bg-gray-200 rounded-2xl p-3 text-center hover:scale-105 transition cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-20 object-contain"
      />
      <p className="mt-2 text-sm font-medium">{title}</p>
    </div>
  );
}
