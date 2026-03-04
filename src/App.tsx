import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import ProductList from "./pages/products/ProductsList";
import ProductDetail from "./pages/products/ProductDetail";


function App() {
  return (
    <div className="mx-auto bg-gray-100 min-h-screen overflow-x-hidden">
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/category/:id" element={<ProductList />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
