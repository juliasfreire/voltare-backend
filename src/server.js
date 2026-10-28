require('dotenv').config()
const express = require("express")
const app = express()
const PORT = process.env.PORT
const userRoutes = require("./routes/userRoutes")
const servicoRoutes = require("./routes/servicoRoutes")
const lojaRoutes = require("./routes/lojaRoutes")

app.use(express.json())

app.use(userRoutes)
app.use("/servicos", servicoRoutes)
app.use("/produtos", lojaRoutes)

app.get("/", (req,res) =>{
    res.json({
        mensagem:"API rodando"
    })
})

app.listen(PORT, () =>{
    console.log("Servidor rodando")
})