import { API_BASE } from "./api";

const BASE = `${API_BASE}/products`;

export async function getProducts() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProduct(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function addProduct(product) {
  // ensure numbers
  product.price = Number(product.price);
  product.quantity = Number(product.quantity);
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });
  if (!res.ok) throw new Error("Failed to add product");
  return res.json();
}

export async function updateProduct(id, updates) {
  if (updates.price !== undefined) updates.price = Number(updates.price);
  if (updates.quantity !== undefined) updates.quantity = Number(updates.quantity);
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete product");
  return true;
}
