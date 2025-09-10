import React, { useEffect, useState } from "react";
import { getCustomers, addCustomer } from "../services/customerService";

export default function Customers(){
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(()=> { (async()=> setCustomers(await getCustomers()))(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name) return alert("Name required");
    try {
      await addCustomer(form);
      setForm({ name: "", email: "" });
      setCustomers(await getCustomers());
    } catch (err) { alert(err.message || err); }
  };

  return (
    <>
      <h1>Customers</h1>
      <div className="card">
        <form onSubmit={handleAdd} style={{ display: "flex", gap: 8, alignItems:"center", flexWrap:"wrap" }}>
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
          <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
          <button className="btn primary" type="submit">Add Customer</button>
        </form>
      </div>

      <table className="table" style={{ marginTop: 12 }}>
        <thead><tr><th>Name</th><th>Email</th></tr></thead>
        <tbody>
          {customers.map(c => <tr key={c.id}><td>{c.name}</td><td>{c.email}</td></tr>)}
          {customers.length === 0 && <tr><td colSpan="2" className="small-muted">No customers</td></tr>}
        </tbody>
      </table>
    </>
  );
}
