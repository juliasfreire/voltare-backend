const jwt = require("jsonwebtoken")

function socketAuth(socket, next){
    try {
        const token = socket.handshake.auth?.token

        if(!token){
            return next(new Error("Sem permissão"))
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET)

        // Suporta tanto id e tipo quando sub e role
        socket.data.user = {
            id: payload.id || payload.sub,
            tipo: payload.tipo || payload.role
        }

        next()

    } catch (error) {
        next(new Error("Sem autorização"))
    }
}

module.exports = socketAuth;