import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import ProductTable from "./ProductTable";
import ProductCreate from "./ProductCreate";
function AdminPage() {
         return (
                  <div>
                           <h2>Admin Dashboard</h2>
                           {/* Navbar */}
                           <nav>
                                    <ul style={{ listStyleType: "none", padding: 0 }}>
                                             <li style={{ display: "inline", marginRight: "10px" }}>
                                                      <Link to="/admin/products">Products</Link>
                                             </li>
                                             <li style={{ display: "inline", marginRight: "10px" }}>
                                                      <Link to="/admin/products/new">Add New Product</Link>
                                             </li>
                                    </ul>
                           </nav>
                           <hr />

                           {/* Nested Routes */}
                           <Routes>
                                    <Route path="products" element={<ProductTable />} />
                                    <Route path="products/new" element={<ProductCreate />} />
                           </Routes>
                  </div>
         );
}
export default AdminPage;