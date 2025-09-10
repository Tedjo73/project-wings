import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { createSale, getSales } from "../services/salesService";

export default function Sales(){
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [sale, setSale] = useState({ productId: "", quantity: 1 });

  useEffect(()=> {
    (async()=>{
      try {
        setProducts(await getProducts());
        setSales(await getSales());
      } catch (e) { console.error(e); }
    })();
  }, []);

const handleSell = async (e) => {
  e.preventDefault();

  try {
    if (!sale.productId) return alert("Choose a product");

    // --- STOCK VALIDATION ---
    const product = products.find(p => p.id === sale.productId);
    if (!product) return alert("Product not found");
    if (sale.quantity > product.quantity) {
      return alert(`Not enough stock. Only ${product.quantity} left.`);
    }

    setSale({ productId: "", quantity: 1 });

    setProducts(await getProducts());
    setSales(await getSales());

  } catch (err) {
    alert(err.message || err);
  }
};

  return (
    <>
      <h1>Sales</h1>
      <div className="card">
        <form onSubmit={handleSell} style={{ display: "flex", gap: 8, alignItems:"center", flexWrap:"wrap" }}>
          <select className="input" value={sale.productId} onChange={e=>setSale({...sale, productId: e.target.value})}>
            <option value="">-- Choose product --</option>
            {products.map(p=> <option key={p.id} value={p.id}>{p.name} (stock: {p.quantity})</option>)}
          </select>
          <input className="input" type="number" min="1" value={sale.quantity} onChange={e=>setSale({...sale, quantity: Number(e.target.value)})} />
          <button className="btn primary" type="submit">Sell</button>
        </form>
      </div>

      <div style={{ marginTop: 12 }}>
        <h3>Recent Sales</h3>
        <table className="table">
          <thead><tr><th>Product ID</th><th>Qty</th><th>Date</th></tr></thead>
          <tbody>
            {sales.slice().reverse().map(s => (
              <tr key={s.id}><td>{s.productId}</td><td>{s.quantity}</td><td>{new Date(s.date).toLocaleString()}</td></tr>
            ))}
            {sales.length === 0 && <tr><td colSpan="3" className="small-muted">No sales yet</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
