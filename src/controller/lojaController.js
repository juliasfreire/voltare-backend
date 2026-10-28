const lojaService = require("../service/lojaService")

async function novoProduto(req,res) {
    try {
        const {nome, preco, descricao, imagem} = req.body
        const id_prestador = req.usuario.id

        await lojaService.cadastrarProduto(nome, preco, descricao, imagem, id_prestador)

        return res.status(201).json({
            mensagem: "Produto criado com sucesso!"
        })

    } catch (error) {
        if(message.error === "Preencha os campos"){
            return res.status(400).json({
                mensagem: "Preencha os campos necessários"
            })
        }

        console.error(error)
        return res.status(500).json({
            mensagem: "Erro interno no servidor"
        })
    }
}

async function meusProdutos(req,res) {
    try {
        const id_prestador = req.usuario.id
        const produtos = await lojaService.itemsPrestador(id_prestador)

        return res.json(produtos)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            mensagem:"Erro ao mostrar produtos"
        })
    }
}

async function todosProdutos(req,res) {
    try {
        const produtos = await lojaService.listarItems()

        return res.json(produtos)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            mensagem:"Erro ao listar produtos"
        })
    }
}

module.exports = {
    novoProduto,
    meusProdutos,
    todosProdutos
}