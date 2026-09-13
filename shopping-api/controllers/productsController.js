const pool = require('../db');

exports.createProduct = async (req, res) => {
  try {
    const { name, category, description, price, stock, image_url } = req.body;

    if (!name || !category || price == null) {
      return res.status(400).json({ error: 'ต้องมี name, category และ price' });
    }

    const priceNum = Number(price);
    if (Number.isNaN(priceNum)) {
      return res.status(400).json({ error: 'price ต้องเป็นตัวเลข' });
    }

    const sql = `
      INSERT INTO products (name, category, description, price, stock, image_url)
      VALUES ($1, $2, $3, $4, COALESCE($5, 0), $6)
      RETURNING *;
    `;

    const params = [
      name,
      category,
      description ?? null,
      priceNum,
      stock, // If stock is undefined, COALESCE in SQL defaults to 0
      image_url ?? null
    ];

    const { rows } = await pool.query(sql, params);
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error('createProduct error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, price, stock, image_url } = req.body;

    if (!name || !category || price == null) {
      return res.status(400).json({ error: 'ต้องมี name, category และ price' });
    }

    const priceNum = Number(price);
    if (Number.isNaN(priceNum)) {
      return res.status(400).json({ error: 'price ต้องเป็นตัวเลข' });
    }

    const sql = `
      UPDATE products
      SET name = $1, category = $2, description = $3, price = $4, stock = COALESCE($5, 0), image_url = $6
      WHERE id = $7
      RETURNING *;
    `;

    const params = [
      name,
      category,
      description ?? null,
      priceNum,
      stock,
      image_url ?? null,
      id
    ];

    const result = await pool.query(sql, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'ไม่พบสินค้าที่ต้องการแก้ไข' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('updateProduct error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// เพิ่มใหม่: Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "DELETE FROM products WHERE id = $1 RETURNING *;";
    const result = await pool.query(sql, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "ไม่พบสินค้าที่ต้องการลบ" });
    }

    return res.status(200).json({
      message: "ลบสินค้าสำเร็จ",
      product: result.rows[0]
    });
  } catch (err) {
    console.error("deleteProduct error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};