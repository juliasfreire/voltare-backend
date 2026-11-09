const mensagemRepository = require("../repository/mensagemRepository")
const conversaRepository = require("../repository/conversaRepository")
const conversaService = require("./conversaService")

async function enviar(conversa_id, remetente_id, texto) {
    const text = String(texto || "").trim()

    if(!text || text.length > 2000){
        throw Object.assign(new Error("Mensagem invalida"), { status: 400 })
    }

    const conversa = await conversaService.validarUsuario(conversa_id, remetente_id)

    // CORREÇÃO: salvava "texto" (sem trim) em vez de "text"
    const mensagem = await mensagemRepository.criarMensagem(conversa.id, remetente_id, text)
    await conversaRepository.atualizar(conversa.id)

    return {mensagem, conversa}
}

async function historico(conversa_id, usuario_id, before) {
    await conversaService.validarUsuario(conversa_id, usuario_id)
    return mensagemRepository.listarMensagem(conversa_id, before)
}

module.exports = {
    enviar,
    historico
}