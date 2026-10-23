const servicoRepository = require("../repository/servicoRepository")

async function cadastrarServico(titulo, descricao, experiencia, prestador_id){
    if(!titulo || !descricao || !experiencia){
        throw new Error("Preencha todos os campos")
    }

    return await servicoRepository.criarServico(titulo, descricao, experiencia, prestador_id)
}

async function meusServicos(prestador_id){
    return await servicoRepository.listarPorPrestador(prestador_id)
}

async function listarServicos() {
    return servicoRepository.listarTodos()
}

module.exports = {
    cadastrarServico,
    meusServicos,
    listarServicos
}