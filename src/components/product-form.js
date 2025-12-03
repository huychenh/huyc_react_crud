import { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../api/product-api";

function ProductForm({ editingProduct, onDone }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(editingProduct ? editingProduct.title : "");
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let result;
    if (editingProduct) {
      result = await updateProduct(editingProduct.id, { title });
    } else {
      result = await createProduct({ title });
    }

    onDone(result);
    setTitle(""); // reset form
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>{editingProduct ? "Edit product" : "Add product"}</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Product name"
        required
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default ProductForm;
