import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { getSales } from "../services/salesService";

export default function Dashboard(){
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(()=> {
    (async()=>{
      try {
        setProducts(await getProducts());
        setSales(await getSales());
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.quantity < 5).length;
  const totalUnits = products.reduce((s,p) => s + Number(p.quantity), 0);
  const totalSales = sales.reduce((s, sale) => s + Number(sale.quantity || 0), 0);

  return (
    <>
      <div className="header">
        <div>
          <h1>Dashboard</h1>
          <div className="small-muted">Overview & KPIs</div>
        </div>
      </div>

      <div className="grid" style={{ marginTop: 16 }}>
        <div className="card">
          <div className="small-muted">Total Products</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{totalProducts}</div>
        </div>
        <div className="card">
          <div className="small-muted">Low Stock Items (&lt;5)</div>
          <div style={{ fontSize: 22, color: lowStockCount ? "#dc2626" : "#0ea5a4", fontWeight: 700 }}>{lowStockCount}</div>
        </div>
        <div className="card">
          <div className="small-muted">Units In Stock</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{totalUnits}</div>
        </div>
        <div className="card">
          <div className="small-muted">Units Sold (total)</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{totalSales}</div>
        </div>
      </div>
    </>
  );
}
