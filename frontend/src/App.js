import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";

function Navbar() {
  return (
    <nav>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ fontWeight: 700 }}>Wings POS</div>
        <NavLink to="/" end className={({isActive}) => isActive ? "active" : ""}>Dashboard</NavLink>
        <NavLink to="/products" className={({isActive}) => isActive ? "active" : ""}>Products</NavLink>
        <NavLink to="/sales" className={({isActive}) => isActive ? "active" : ""}>Sales</NavLink>
        <NavLink to="/customers" className={({isActive}) => isActive ? "active" : ""}>Customers</NavLink>
        <NavLink to="/reports" className={({isActive}) => isActive ? "active" : ""}>Reports</NavLink>
      </div>
    </nav>
  );
}

export default function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
