// CORREÇÕES: o evento é "connection" (não "conexao") e os módulos são
// exportados direto (module.exports = fn), então o require não usa chaves.
const socketAuth = require("../middleware/socketAuth")
const chatHandler = require("./chatHandler")

function registrarSockets(io){
    io.use(socketAuth)
    io.on("connection", (socket) => chatHandler(io, socket))
}

module.exports = registrarSockets;