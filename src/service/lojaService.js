const lojaRepository = require("../repository/lojaRepository")

async function cadastrarProduto(nome, preco, descricao, imagem, id_prestador) {
    if(!nome || !preco || !descricao){
        throw Object.assign(new Error("Preencha os campos"), { status: 400 })
    }
    
    if(preco <= 0){
        throw Object.assign(new Error("Preço invalido"), { status: 400 })
    }

    return await lojaRepository.criarProduto(nome, preco, descricao, imagem, id_prestador)
}

async function itemsPrestador(id_prestador) {
    return await lojaRepository.produtosPorPrestador(id_prestador)
}

async function listarItems() {
    return await lojaRepository.listarProdutos()
}

async function alterarProduto(id, nome, preco, descricao, imagem) {
    if(!id){
        throw Object.assign(new Error("É necessário ter id do produto"), { status: 400 })
    }

    if(preco !== undefined && preco !== null && preco <= 0){
        throw Object.assign(new Error("Preço inválido"), { status: 400 })
    }

    const nomeValido = nome || null
    const precoValido = preco || null
    const descricaoValido = descricao || null
    const imagemValido = imagem || null

    const linhasAfetadas = await lojaRepository.atualizar(id, nomeValido, precoValido, descricaoValido, imagemValido)
    if(linhasAfetadas === 0){
        throw Object.assign(new Error("Produto não encontrado"), { status: 404 })
    }

    return { mensagem: "Produto atualizado"}
}

async function excluirProduto(id) {
    if(!id){
        throw Object.assign(new Error("É necessário o id do produto"), { status: 400 })
    }

    const linhasAfetadas = await lojaRepository.deletar(id)
    if(linhasAfetadas === 0){
        throw Object.assign(new Error("Produto não encontrado"), { status: 404 })
    }

    return { mensagem: "Produto excluído" }
}

module.exports = {
    cadastrarProduto,
    itemsPrestador,
    listarItems,
    alterarProduto,
    excluirProduto
}