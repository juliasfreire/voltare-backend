require('dotenv').config()
const express = require("express")
const app = express()
const PORT = process.env.PORT
const userRoutes = require("./routes/userRoutes")

app.use(express.json())

app.use(userRoutes)

app.get("/", (req,res) =>{
    res.json({
        mensagem:"API rodando"
    })
})

app.listen(PORT, () =>{
    console.log("Servidor rodando")
})