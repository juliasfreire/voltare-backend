const conversaService = require("../service/conversaService")
const mensagemService = require("../service/mensagemService")

const room = (id) => `conversa:${id}`

function chatHandler(io, socket) {
    const usuarioId = socket.data.user.id

    socket.join(`usuario:${usuarioId}`)

    socket.on("conversa:join", async ({conversaId}, ack) => {
        try {
            await conversaService.validarUsuario(conversaId, usuarioId)
            socket.join(room(conversaId))
            ack?.({ ok: true })
        } catch (error) {
            ack?.({ ok: false, error: error.message })
        }
    })

    socket.on("conversa:leave", ({ conversaId }) =>{
        socket.leave(room(conversaId))
    })

    socket.on("mensagem:send", async ({ conversaId, texto }, ack) =>{
        try {
            const {mensagem, conversa} = await mensagemService.enviar(
                conversaId, usuarioId, texto
            )

            io.to(room(conversaId)).emit("mensagem:new", mensagem)

            const outroId = conversa.cliente_id === usuarioId ? conversa.colaborador_id : conversa.cliente_id

            io.to(`usuario:${outroId}`).emit("notificacao:new-message", {
                conversaId, mensagemId: mensagem.id
            })

            ack?.({ok: true, mensagem})
        } catch (error) {
            ack?.({ok: false, error: error.message})
        }
    })

    socket.on("digitando", ({conversaId, digitando}) =>{
        if(socket.rooms.has(room(conversaId))){
            socket.to(room(conversaId)).emit("digitando", {usuarioId, digitando})
        }
    })
}

module.exports = chatHandler;