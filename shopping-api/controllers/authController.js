const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await db.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({
            success: true,
            token,
            role: user.role
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }

};

const register = async (req, res) => {
    const { username, password, fullname } = req.body;

    if (!username || !password || !fullname) {
        return res.status(400).json({
            success: false,
            message: "กรุณากรอก Username, Password และ Fullname ให้ครบ"
        });
    }

    try {
        const existing = await db.query(
            "SELECT id FROM users WHERE username = $1",
            [username]
        );
        if (existing.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Username นี้ถูกใช้งานแล้ว"
            });
        }

        const hash = await bcrypt.hash(password, 10);
        await db.query(
            "INSERT INTO users (username, password, fullname, role) VALUES ($1, $2, $3, $4)",
            [username, hash, fullname, "user"]
        );

        res.status(201).json({
            success: true,
            message: "Register success"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = { login, getAllProducts, getAllCustomers, register };
const getAllProducts = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM products");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getAllCustomers = async (req, res) => {
    try {
        // ห้ามดึง password ออกมาเด็ดขาด แม้จะ hash แล้วก็ตาม
        const result = await db.query(
            "SELECT id, username, fullname FROM users ORDER BY id ASC"
        );
        res.json({ success: true, data: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
module.exports = { login, getAllProducts, getAllCustomers };