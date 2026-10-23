const db = require("../config/database")

async function criarServico(titulo, descricao, experiencia, prestador_id){
    const [result] = await db.query(
        "INSERT INTO servico(titulo, descricao, experiencia, prestador_id) VALUES(?,?,?,?)",
        [titulo, descricao, experiencia, prestador_id]
    )

    return result.insertId
}

async function listarPorPrestador(prestador_id) {
    const [servicos] = await db.query(
        "SELECT id, titulo, descricao, experiencia, criado_em FROM servico WHERE prestador_id = ? ORDER BY criado_em DESC",
        [prestador_id]
    )

    return servicos
}

async function listarTodos() {
    const [servicos] = await db.query(
        `SELECT s.id, s.titulo, s.descricao, s.experiencia, s.criado_em,
        u.nome AS prestador_nome, u.id AS prestador_id FROM servico s INNER JOIN usuario u ON s.prestador_id = u.id
        ORDER BY s.criado_em DESC
        `
    )

    return servicos
}

module.exports = {
    criarServico,
    listarPorPrestador,
    listarTodos
}