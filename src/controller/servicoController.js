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

module.exports = {
    novoServico,
    listarMeusServicos,
    todosServicos
}