const servicoService = require("../service/servicoService")

async function novoServico(req,res,next){
    try {
        const {titulo, descricao, experiencia} = req.body
        const prestador_id = req.usuario.id 

        await servicoService.cadastrarServico(titulo, descricao, experiencia, prestador_id)

        return res.status(201).json({
            mensagem: "Serviço cadastrado com sucesso"
        })
    } catch (error) {
       next(error)
    }
}

async function listarMeusServicos(req,res,next) {
    try {
        const prestador_id = req.usuario.id
        const servicos = await servicoService.meusServicos(prestador_id)

        return res.json(servicos)
    } catch (error) {
        next(error)
    }
}

async function todosServicos(req,res, next) {
    try {
        const servicos = await servicoService.listarServicos()

        return res.json(servicos)
    } catch (error) {
        next(error)
    }
}

async function atualizarServico(req,res,next) {
    try {
        const { id } = req.params
        const { titulo, descricao, experiencia } = req.body

        const atualizar = await servicoService.alterarServico(id, titulo, descricao, experiencia)

        return res.json(atualizar)
    } catch (error) {
        next(error)
    }
}

async function deletarServico(req,res,next) {
    try {
        const { id } = req.params

        const deletar = await servicoService.excluirServico(id)

        return res.json(deletar)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    novoServico,
    listarMeusServicos,
    todosServicos,
    atualizarServico,
    deletarServico
}