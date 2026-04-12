const db = require("../db")

exports.getAllCategories = (req,res) => {
    const sql = "SELECT * FROM categories"

    db.query(sql, (err, result) => {
        if(err){
            return res.status(500).json({message: "Error getting categories"})
        }

        res.json(result)
    })
}

exports.getCategoryById = (req,res) => {
    const id = req.params.id
    const sql = "SELECT * FROM categories WHERE id = ?"

    db.query(sql, [id], (err,result) => {
        if(err) {
            return res.status(500).json({message: "Error getting category"})
        }

        if (result.length === 0){
            return res.status(404).json({message: "Category not found"})
        }

        res.json(result[0])
    })
}

