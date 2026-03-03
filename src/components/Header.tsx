import { ShoppingCart, Search } from "lucide-react";

export default function Header() {
  return (
    <div className="bg-white p-4 shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search 'Green Peas'"
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        <div className="relative">
          <div className="bg-red-500 p-3 rounded-full text-white">
            <ShoppingCart size={20} />
          </div>
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs px-1.5 rounded-full">
            
          </span>
        </div>
      </div>
    </div>
  );
}