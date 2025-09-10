import { API_BASE } from "./api";

const SALES = `${API_BASE}/sales`;
const PRODUCTS = `${API_BASE}/products`;

/**
 * Create a sale: check stock, decrement product quantity, record sale.
 * Returns the saved sale object.
 */
export async function createSale(productId, quantity, customerId = null) {
  quantity = Number(quantity);
  if (quantity <= 0) throw new Error("Quantity must be > 0");

  // fetch product
  const prodRes = await fetch(`${PRODUCTS}/${productId}`);
  if (!prodRes.ok) throw new Error("Product not found");
  const product = await prodRes.json();

  if (product.quantity < quantity) {
    throw new Error("Not enough stock");
  }

  // decrement stock
  const newQty = product.quantity - quantity;
  const patchRes = await fetch(`${PRODUCTS}/${productId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity: newQty })
  });
  if (!patchRes.ok) throw new Error("Failed to update stock");

  // create sale record
  const saleBody = { productId: Number(productId), quantity, date: new Date().toISOString(), customerId };
  const saleRes = await fetch(SALES, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(saleBody)
  });
  if (!saleRes.ok) throw new Error("Failed to record sale");

  return saleRes.json();
}

export async function getSales(){
  const res = await fetch(SALES);
  if (!res.ok) throw new Error("Failed to fetch sales");
  return res.json();
}
