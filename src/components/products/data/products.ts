
export type Product = {
  id: number | string
  name: string
  qty: string
  price: number
  bulk?: string[]
  image: string
}

export type ProductSection = {
  id: number
  title: string
  subtitle: string
  image: string
  products: Product[]
}

export const sections: ProductSection[] = [
  {
    id: 1,
    title: "Your Menu Add-ons",
    subtitle: "custom food solutions",
    image: "/images/categories/menu.png",
    products: [
      { id: 101, name: "Walnut Brownie (80 gm/pc), 720 gm", qty: "9 pc", price: 249, bulk: ["₹26.56/pc for 27 pcs+", "₹25.44/pc for 45 pcs+"], image: "/images/bottle.jpg" },
      { id: 102, name: "Molten Choco Lava (80 gm/pc), 720 gm", qty: "9 pc", price: 230, bulk: ["₹25.11/pc for 45 pcs+", "₹24.67/pc for 81 pcs+"], image: "/images/bottle.jpg" },
      { id: 103, name: "Chocolate Truffle Cake, 500 gm", qty: "1 pc", price: 320, bulk: ["₹30.00/pc for 10 pcs+", "₹28.00/pc for 20 pcs+"], image: "/images/bottle.jpg" },
      { id: 104, name: "Chocolate Truffle Cake, 500 gm", qty: "1 pc", price: 320, bulk: ["₹30.00/pc for 10 pcs+", "₹28.00/pc for 20 pcs+"], image: "/images/bottle.jpg" },
      { id: 105, name: "Chocolate Truffle Cake, 500 gm", qty: "1 pc", price: 320, bulk: ["₹30.00/pc for 10 pcs+", "₹28.00/pc for 20 pcs+"], image: "/images/bottle.jpg" },
      { id: 106, name: "Chocolate Truffle Cake, 500 gm", qty: "1 pc", price: 320, bulk: ["₹30.00/pc for 10 pcs+", "₹28.00/pc for 20 pcs+"], image: "/images/bottle.jpg" },
      { id: 107, name: "Chocolate Truffle Cake, 500 gm", qty: "1 pc", price: 320, bulk: ["₹30.00/pc for 10 pcs+", "₹28.00/pc for 20 pcs+"], image: "/images/bottle.jpg" },
    ],
  },
  {
    id: 2,
    title: "Dairy",
    subtitle: "handpicked brands",
    image: "/images/categories/dairy.png",
    products: [
      { id: 201, name: "Amul - Butter Salted, 500 gm", qty: "500 gm", price: 245, bulk: ["₹22.00/pc for 10 pcs+", "₹20.00/pc for 20 pcs+"], image: "/images/bottle.jpg" },
      { id: 202, name: "Amul - Fresh Cream, 1 L", qty: "1 L", price: 115, bulk: ["₹10.50/pc for 12 pcs+", "₹10.00/pc for 24 pcs+"], image: "/images/bottle.jpg" },
      { id: 203, name: "Amul - Mozzarella Cheese, 200 gm", qty: "200 gm", price: 180, bulk: ["₹17.00/pc for 6 pcs+", "₹16.00/pc for 12 pcs+"], image: "/images/bottle.jpg" },
    ],
  },
];
