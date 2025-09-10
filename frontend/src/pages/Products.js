import React, { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../services/productService";

const blank = { name: "", description: "", category: "", price: 0, quantity: 0 };

export default function Products(){
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(blank);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async ()=> {
    setLoading(true);
    try { setProducts(await getProducts()); } catch(e){ alert(e.message || e); }
    setLoading(false);
  };

  useEffect(()=> { load(); }, []);

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({ name: p.name, description: p.description || "", category: p.category || "", price: p.price, quantity: p.quantity });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => { setEditingId(null); setForm(blank); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.name) return alert("Product name required");
      if (editingId) {
        await updateProduct(editingId, form);
        setEditingId(null);
      } else {
        await addProduct(form);
      }
      setForm(blank);
      load();
    } catch (err) {
      alert(err.message || err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete product? This is permanent.")) return;
    try {
      await deleteProduct(id);
      load();
    } catch (err) {
      alert(err.message || err);
    }
  };

  return (
    <>
      <h1>Products</h1>
      <div className="card" style={{ marginBottom: 12 }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
            <input className="input" placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} />
            <input className="input" placeholder="Price" type="number" step="0.01" value={form.price} onChange={e=>setForm({...form, price: e.target.value})} />
            <input className="input" placeholder="Quantity" type="number" value={form.quantity} onChange={e=>setForm({...form, quantity: e.target.value})} />
            <input className="input" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button className="btn primary" type="submit">{editingId ? "Update" : "Add"} Product</button>
              {editingId && <button type="button" className="btn" onClick={cancelEdit}>Cancel</button>}
            </div>
          </div>
        </form>
      </div>

      <div>
        {loading ? <div className="small-muted">Loading...</div> : (
          <table className="table">
            <thead>
              <tr><th>Name</th><th>Category</th><th>Price</th><th>Quantity</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {products.map(p=>(
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{Number(p.price).toFixed(2)}</td>
                  <td className={p.quantity < 5 ? "low-stock" : ""}>{p.quantity}</td>
                  <td>
                    <button className="btn" onClick={()=>startEdit(p)}>Edit</button>{" "}
                    <button className="btn danger" onClick={()=>handleDelete(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && <tr><td colSpan="5" className="small-muted">No products found</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
