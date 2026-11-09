const servicoRepository = require("../repository/servicoRepository")

async function cadastrarServico(titulo, descricao, experiencia, prestador_id){
    if(!titulo || !descricao || !experiencia){
        throw Object.assign(new Error("Preencha todos os campos"), { status: 400 })
    }

    return await servicoRepository.criarServico(titulo, descricao, experiencia, prestador_id)
}

async function meusServicos(prestador_id){
    return await servicoRepository.listarPorPrestador(prestador_id)
}

async function listarServicos() {
    return servicoRepository.listarTodos()
}

async function alterarServico(id, titulo, descricao, experiencia) {
    if(!id){
        throw Object.assign(new Error("É necessário o id do serviço"), { status: 400 })
    }

    const tituloValido = titulo || null
    const descricaoValido = descricao || null
    const experienciaValido = experiencia || null

    const linhasAfetadas = await servicoRepository.atualizar(id, tituloValido, descricaoValido, experienciaValido)
    if(linhasAfetadas === 0){
        throw Object.assign(new Error("Serviço não encontrado"), { status: 404 })
    }

    return { mensagem: "Serviço alterado com sucesso"}
}

async function excluirServico(id) {
    if(!id){
        throw Object.assign(new Error("É necessário o id do serviço"), { status: 400 })
    }

    const linhasAfetadas = await servicoRepository.deletar(id)
    if(linhasAfetadas === 0){
        throw Object.assign(new Error("Serviço não encontrado"), { status: 404 })
    }

    return { mensagem: "Serviço excluído"}
}

module.exports = {
    cadastrarServico,
    meusServicos,
    listarServicos,
    alterarServico,
    excluirServico
}