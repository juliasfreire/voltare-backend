const lojaService = require("../service/lojaService")

async function novoProduto(req,res,next) {
    try {
        const {nome, preco, descricao, imagem} = req.body
        const id_prestador = req.usuario.id

        await lojaService.cadastrarProduto(nome, preco, descricao, imagem, id_prestador)

        return res.status(201).json({
            mensagem: "Produto criado com sucesso!"
        })

    } catch (error) {
        next(error)
    }
}

async function meusProdutos(req,res,next) {
    try {
        const id_prestador = req.usuario.id
        const produtos = await lojaService.itemsPrestador(id_prestador)

        return res.json(produtos)
    } catch (error) {
        next(error)
    }
}

async function todosProdutos(req,res,next) {
    try {
        const produtos = await lojaService.listarItems()

        return res.json(produtos)
    } catch (error) {
        next(error)
    }
}

async function atualizarProduto(req,res,next) {
    try {
        const { id } = req.params
        const { nome, preco, descricao, imagem} = req.body

        const atualizar = await lojaService.alterarProduto(id, nome, preco, descricao, imagem)
        
        return res.json(atualizar)
    } catch (error) {
        next(error)
    }
}

async function deletarProduto(req,res,next) {
    try {
        const { id } = req.params

        const deletar = await lojaService.excluirProduto(id)

        return res.json(deletar)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    novoProduto,
    meusProdutos,
    todosProdutos,
    atualizarProduto,
    deletarProduto
}