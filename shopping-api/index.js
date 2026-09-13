const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { login, getAllProducts, getAllCustomers , register } = require('./controllers/authController');
const {authenticateToken, isAdmin} = require("./middleware/authMiddleware");
const productsController = require('./controllers/productsController');
const {createProduct } = require('./controllers/productsController');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// Route ส าหรับ Login
app.post('/api/login', login);

console.log("Check Middleware:", typeof authenticateToken);
console.log("Check Controller:", typeof getAllProducts);
app.get( "/api/products",authenticateToken, getAllProducts);
app.get( "/api/customers", authenticateToken, getAllCustomers);
app.post('/api/products', authenticateToken, isAdmin, createProduct);
app.post('/api/users/register', register);
app.put('/api/products/:id', authenticateToken, isAdmin, productsController.updateProduct);
app.delete('/api/products/:id', authenticateToken, isAdmin, productsController.deleteProduct);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});