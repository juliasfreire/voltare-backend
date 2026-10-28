const lojaRepository = require("../repository/lojaRepository")

async function cadastrarProduto(nome, preco, descricao, imagem, id_prestador) {
    if(!nome || !preco || !descricao){
        throw new Error("Preencha os campos")
    }
    
    if(preco <= 0){
        throw new Error("Preço invalido")
    }

    return await lojaRepository.criarProduto(nome, preco, descricao, imagem, id_prestador)
}

async function itemsPrestador(id_prestador) {
    return await lojaRepository.produtosPorPrestador(id_prestador)
}

async function listarItems() {
    return await lojaRepository.listarProdutos()
}

module.exports = {
    cadastrarProduto,
    itemsPrestador,
    listarItems
}