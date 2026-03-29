const express = require("express")
const db = require("./db")

const app = express()
const PORT = 3000

app.use(express.json())

app.get("/", (req,res) => {
    res.send("E-commerce running")
})

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})

