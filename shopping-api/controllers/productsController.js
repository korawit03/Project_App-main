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