const conversaRepository = require("../repository/conversaRepository")

async function verificarRemetente(cliente_id, colaborador_id, servico_id, produto_id) {
    if(cliente_id === colaborador_id){
        throw Object.assign(new Error("Você não pode conversar consigo mesmo"), { status: 400 })
    }

    const conversaExiste = await conversaRepository.buscarConversaExistente(cliente_id, colaborador_id, servico_id, produto_id)

    return conversaExiste || conversaRepository.criarConversa(cliente_id, colaborador_id, servico_id, produto_id)
}

async function validarUsuario(conversa_id, usuario_id) {
    const conversa = await conversaRepository.buscarConversa(conversa_id)

    if(!conversa){
        throw Object.assign(new Error("Conversa não encontrada"), { status: 404 })
    }

    // Convertendo todos os IDs para string para garantir que a comparação estrita funcione
    const idClienteBanco = String(conversa.cliente_id);
    const idColaboradorBanco = String(conversa.colaborador_id);
    const idUsuarioAtual = String(usuario_id);

    if (idClienteBanco !== idUsuarioAtual && idColaboradorBanco !== idUsuarioAtual) {
        throw Object.assign(new Error("Acesso Negado"), { status: 403 })
    }

    return conversa
}


async function mostrarConversa(usuario_id) {
    return await conversaRepository.listarConversa(usuario_id)
}

module.exports = {
    verificarRemetente,
    validarUsuario,
    mostrarConversa
}