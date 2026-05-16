const db = require("../db");

exports.getAllProducts = (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error getting products" });
    }

    res.json(result);
  });
};

exports.getProductById = (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const sql = "SELECT * FROM products WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error getting product" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result[0]);
  });
};

exports.getProductsByCategory = (req, res) => {
  const categoryId = req.params.categoryId;

  if (isNaN(categoryId)) {
    return res.status(400).json({ message: "Invalid category ID" });
  }

  const sql = "SELECT * FROM products WHERE category_id = ?";

  db.query(sql, [categoryId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error getting products" });
    }

    res.json(result);
  });
};

exports.createProduct = (req, res) => {
  const { name, description, price, category_id, stock, picture_id } = req.body;

  if (!name || !price || !category_id) {
    return res.status(400).json({
      message: "Name, price, and category_id are required"
    });
  }

  if (name.trim().length < 3) {
    return res.status(400).json({
      message: "Product name must be at least 3 characters"
    });
  }

  if (isNaN(price) || price <= 0) {
    return res.status(400).json({
      message: "Price must be a positive number"
    });
  }

  if (isNaN(category_id)) {
    return res.status(400).json({
      message: "Invalid category_id"
    });
  }

  const sql = `
    INSERT INTO products (name, description, price, category_id, stock, picture_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, description || null, price, category_id, stock || 0, picture_id || null],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error creating product" });
      }

      res.status(201).json({
        message: "Product created successfully",
        productId: result.insertId
      });
    }
  );
};

exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const { name, description, price, category_id, stock, picture_id } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  if (!name && !description && !price && !category_id && stock === undefined && !picture_id) {
    return res.status(400).json({
      message: "At least one field must be provided for update"
    });
  }

  if (name && name.trim().length < 3) {
    return res.status(400).json({
      message: "Product name must be at least 3 characters"
    });
  }

  if (price && (isNaN(price) || price <= 0)) {
    return res.status(400).json({
      message: "Price must be a positive number"
    });
  }

  if (category_id && isNaN(category_id)) {
    return res.status(400).json({
      message: "Invalid category_id"
    });
  }

  let updateFields = [];
  let updateValues = [];

  if (name) {
    updateFields.push("name = ?");
    updateValues.push(name);
  }
  if (description) {
    updateFields.push("description = ?");
    updateValues.push(description);
  }
  if (price) {
    updateFields.push("price = ?");
    updateValues.push(price);
  }
  if (category_id) {
    updateFields.push("category_id = ?");
    updateValues.push(category_id);
  }
  if (stock !== undefined) {
    updateFields.push("stock = ?");
    updateValues.push(stock);
  }
  if (picture_id) {
    updateFields.push("picture_id = ?");
    updateValues.push(picture_id);
  }

  updateValues.push(id);

  const sql = `UPDATE products SET ${updateFields.join(", ")} WHERE id = ?`;

  db.query(sql, updateValues, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating product" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  });
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const sql = "DELETE FROM products WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting product" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  });
};
