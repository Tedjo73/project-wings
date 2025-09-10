import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { getSales } from "../services/salesService";

export default function Reports(){
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(()=> {
    (async()=> {
      setProducts(await getProducts());
      setSales(await getSales());
    })();
  }, []);

  const revenueByProduct = products.map(p => {
    const soldQty = sales.filter(s => Number(s.productId) === Number(p.id)).reduce((s, x) => s + Number(x.quantity), 0);
    return { product: p.name, soldQty, revenue: soldQty * Number(p.price || 0) };
  }).sort((a,b)=> b.revenue - a.revenue);

  const totalRevenue = revenueByProduct.reduce((s,r) => s + r.revenue, 0);

  return (
    <>
      <h1>Reports</h1>
      <div className="card">
        <div className="small-muted">Total Revenue</div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>{totalRevenue.toFixed(2)}</div>
      </div>

      <div style={{ marginTop: 12 }}>
        <h3>Top Products by Revenue</h3>
        <table className="table">
          <thead><tr><th>Product</th><th>Qty Sold</th><th>Revenue</th></tr></thead>
          <tbody>
            {revenueByProduct.map(r => (
              <tr key={r.product}><td>{r.product}</td><td>{r.soldQty}</td><td>{r.revenue.toFixed(2)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
