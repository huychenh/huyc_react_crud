import BASE_URL from "../utils/url";

export const getProducts = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const getProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

export const createProduct = async (data) => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateProduct = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
