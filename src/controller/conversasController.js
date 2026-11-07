const mensagemService = require("../service/mensagemService")
const conversaService = require("../service/conversaService")

async function abrirConversa(req,res, next) {
    try {
        const colaborador_id = Number(req.body.colaborador_id ?? req.body.colaborar_id)
        const servico_id = req.body.servico_id ? Number(req.body.servico_id) : null
        const produto_id = req.body.produto_id ? Number(req.body.produto_id) : null

        if(!Number.isInteger(colaborador_id) || colaborador_id <= 0){
            return res.status(400).json({ error: "Prestador inválido" })
        }

        const cliente_id = req.usuario.id

        const conversa = await conversaService.verificarRemetente(cliente_id, colaborador_id, servico_id, produto_id)

        return res.status(201).json(conversa)
    } catch (error) {
        next(error)
    }
}

async function historicoConversa(req,res, next) {
    try {
        const conversas = await conversaService.mostrarConversa(req.usuario.id)
        res.json(conversas)
    } catch (error) {
        next(error)
    }
}

async function mensagens(req,res,next) {
    try {
        const conversaId = Number(req.params.id)

        const usuarioId = req.usuario.id

        const before = req.query.before

        const response = await mensagemService.historico(conversaId, usuarioId, before)
        res.json(response)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    abrirConversa,
    historicoConversa,
    mensagens
}