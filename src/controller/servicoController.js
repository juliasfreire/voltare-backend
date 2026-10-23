const servicoService = require("../service/servicoService")

async function novoServico(req,res){
    try {
        const {titulo, descricao, experiencia} = req.body
        const prestador_id = req.usuario.id 

        await servicoService.cadastrarServico(titulo, descricao, experiencia, prestador_id)

        return res.status(201).json({
            mensagem: "Serviço cadastrado com sucesso"
        })
    } catch (error) {
        
        if(error.message === "Preencha todos os campos"){
            return res.status(400).json({
                mensagem: "Por favor, preencha todos os campos"
            })
        }

        console.error(error)
        return res.status(500).json({
            mensagem:"Não foi possível cadastrar o serviço"
        })
    }
}

async function listarMeusServicos(req,res) {
    try {
        const prestador_id = req.usuario.id
        const servicos = await servicoService.meusServicos(prestador_id)

        return res.json(servicos)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            mensagem:"Erro ao buscar serviços"
        })
    }
}

async function todosServicos(req,res) {
    try {
        const servicos = await servicoService.listarServicos()

        return res.json(servicos)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            mensagem:"Erro ao listar serviços"
        })
    }
}

module.exports = {
    novoServico,
    listarMeusServicos,
    todosServicos
}