import { useState, useEffect } from "react";
import ProductList from "./components/product-list";
import ProductForm from "./components/product-form";
import { getProducts } from "./api/product-api";

function App() {
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data.products));
  }, []);

  const handleDone = (product) => {
    if (editingProduct) {
      
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      );
    } else {
      
      setProducts((prev) => [...prev, product]);
    }

    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <ProductForm editingProduct={editingProduct} onDone={handleDone} />
      <ProductList
        products={products}
        onEdit={(p) => setEditingProduct(p)}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
