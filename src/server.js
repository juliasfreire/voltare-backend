// Import das ferramentas utilizadas
require('dotenv').config()
const http = require("http")
const { Server } = require("socket.io")
const express = require("express")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 3001

// Import das rotas
const userRoutes = require("./routes/userRoutes")
const servicoRoutes = require("./routes/servicoRoutes")
const lojaRoutes = require("./routes/lojaRoutes")
const conversasRoutes = require("./routes/conversasRoutes")
const registerSockets = require("./sockets")

// Criando servidor http para receber e enviar as mensagens 
const server = http.createServer(app)

const io = new Server(server, {
    cors: { 
        // Se a variável do .env não funcionar, ele assume o localhost:3000 como segurança
        origin: process.env.FRONTEND_URL || "http://localhost:3000", 
        methods: ["GET", "POST"],
        credentials: true
    }
});


registerSockets(io)

//Utilizações globais
app.use(cors())
app.use(express.json())

// Rotas da aplicação
app.use(userRoutes)
app.use("/servicos", servicoRoutes)
app.use("/produtos", lojaRoutes)
app.use("/conversas", conversasRoutes)

app.get("/", (req,res) =>{
    res.json({
        mensagem:"API rodando"
    })
})


// Tratamentos de erros
app.use((error, req, res, next) => {
    
    const status = error.status || error.statusCode || 500

    const mensagemError = error.message || "Erro interno no servidor"

    return res.status(status).json({
        error: mensagemError
    })
})


server.listen(PORT, () =>{
    console.log("Servidor rodando")
})