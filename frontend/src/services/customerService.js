import { API_BASE } from "./api";

const BASE = `${API_BASE}/customers`;

export async function getCustomers() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch customers");
  return res.json();
}

export async function addCustomer(c) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(c)
  });
  if (!res.ok) throw new Error("Failed to add customer");
  return res.json();
}
