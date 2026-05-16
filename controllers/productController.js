const db = require("../db");

exports.getAllProducts = (req, res) => {
    const sql = `
        SELECT products.*, categories.name AS category
        FROM products
        JOIN categories ON products.category_id = categories.id
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ message: "Error" });
        res.json(result);
    });
};

exports.getProductById = (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM products WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ message: "Error" });
        if (result.length === 0)
            return res.status(404).json({ message: "Not found" });

        res.json(result[0]);
    });
};

exports.getProductsByCategory = (req, res) => {
    const sql = "SELECT * FROM products WHERE category_id = ?";

    db.query(sql, [req.params.categoryId], (err, result) => {
        if (err) return res.status(500).json({ message: "Error" });
        res.json(result);
    });
};

exports.createProduct = (req, res) => {

    const { name, description, price, category_id, stock } = req.body;

    const image = req.file ? req.file.filename : null;

    const sql = `
        INSERT INTO products
        (name, description, price, category_id, stock, image_url)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql,
        [name, description, price, category_id, stock || 0, image],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Error" });
            }

            res.status(201).json({
                message: "Product created",
                productId: result.insertId,
                image
            });
        }
    );
};

exports.updateProduct = (req, res) => {

    const id = req.params.id;
    const { name, description, price, category_id, stock } = req.body;

    const image = req.file ? req.file.filename : null;

    let fields = [];
    let values = [];

    if (name) { fields.push("name=?"); values.push(name); }
    if (description) { fields.push("description=?"); values.push(description); }
    if (price) { fields.push("price=?"); values.push(price); }
    if (category_id) { fields.push("category_id=?"); values.push(category_id); }
    if (stock !== undefined) { fields.push("stock=?"); values.push(stock); }
    if (image) { fields.push("image_url=?"); values.push(image); }

    values.push(id);

    const sql = `UPDATE products SET ${fields.join(", ")} WHERE id=?`;

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ message: "Error" });
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Not found" });

        res.json({ message: "Updated" });
    });
};

exports.deleteProduct = (req, res) => {

    const sql = "DELETE FROM products WHERE id=?";

    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: "Error" });
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Not found" });

        res.json({ message: "Deleted" });
    });
};
