const db = require("../config/database")

async function criarProduto(nome, preco, descricao, imagem, id_prestador) {
    const [result] = await db.query(
        "INSERT INTO produto(nome, preco, descricao, imagem, id_prestador) VALUES(?,?,?,?,?)",
        [nome, preco, descricao, imagem, id_prestador]
    )

    return result.insertId
}

async function produtosPorPrestador(id_prestador) {
    const [produtos] = await db.query(
        "SELECT * FROM produto WHERE id_prestador = ? ORDER BY criado_em DESC",
        [id_prestador]
    )   

    return produtos
}

async function listarProdutos() {
    const [produtos] = await db.query(
        `SELECT p.*, u.nome AS prestador_nome 
        FROM produto p INNER JOIN usuario u ON p.id_prestador = u.id 
        ORDER BY p.criado_em DESC`
    )

    return produtos
}

module.exports = {
    criarProduto,
    produtosPorPrestador,
    listarProdutos
}