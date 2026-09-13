import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import ProductCreate from "./components/ProductCreate";
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Login from './components/login';
import AdminPage from './components/AdminPage';
import Customers from "./components/Customers";

function App() {
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );
    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        window.location.href = "/login";
    }


    return (
        <Router>
            <nav className="p-4 bg-gray-200">
                <Link to="/" className="mr-4">Home</Link> |{' '}
                <Link to="/about" className="mr-4">About</Link> |{' '}
                <Link to="/contact" className="mr-4">Contact</Link>|{' '}
                <Link to="/products" className="mr-4">Products</Link>
                
                {token ? (
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <Link to="/login">
                        Login
                    </Link>
                )}

            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products/new" element={<ProductCreate />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/customers" element={<Customers />}/>
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/admin/*" element={<AdminPage />} />
            </Routes>
        </Router>
    );
}
export default App;