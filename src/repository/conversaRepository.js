const db = require("../config/database")

async function buscarConversaExistente(cliente_id, colaborador_id, servico_id = null, produto_id = null) {
    const [result] = await db.query(
        `SELECT * FROM conversa WHERE cliente_id = ? AND colaborador_id = ?
        AND (servico_id <=> ?) AND (produto_id <=> ?)`,
        [cliente_id, colaborador_id, servico_id, produto_id]
    )

    return result[0] || null
}

async function buscarConversa(id) {
    const [result] = await db.query(`SELECT * FROM conversa WHERE id = ?`, [id])
    return result[0] || null
}

// CORREÇÃO: o INSERT tinha "servico_id = null" dentro da lista de colunas (SQL inválido)
// e os parâmetros eram sempre sobrescritos por null.
async function criarConversa(cliente_id, colaborador_id, servico_id = null, produto_id = null){
    try {
        await db.query(
            `INSERT INTO conversa(cliente_id, colaborador_id, servico_id, produto_id)
            VALUES(?,?,?,?)`,
            [cliente_id, colaborador_id, servico_id, produto_id]
        )
    } catch (error) {
        // duplo clique / corrida: outra requisição criou a mesma conversa primeiro
        if (error.code !== "ER_DUP_ENTRY") throw error
    }

    return buscarConversaExistente(cliente_id, colaborador_id, servico_id, produto_id)
}

// CORREÇÃO: agora traz nomes e assunto para o frontend montar a lista
// (antes devolvia só os ids).
async function listarConversa(usuario_id) {
    const [result] = await db.query(
        `SELECT c.*,
            uc.nome AS cliente_nome,
            ub.nome AS colaborador_nome,
            s.titulo AS servico_titulo,
            p.nome AS produto_nome,
            (SELECT m.texto FROM mensagem m WHERE m.conversa_id = c.id ORDER BY m.id DESC LIMIT 1) AS ultima_texto
        FROM conversa c
        INNER JOIN usuario uc ON uc.id = c.cliente_id
        INNER JOIN usuario ub ON ub.id = c.colaborador_id
        LEFT JOIN servico s ON s.id = c.servico_id
        LEFT JOIN produto p ON p.id = c.produto_id
        WHERE c.cliente_id = ? OR c.colaborador_id = ?
        ORDER BY COALESCE(c.ultima_mensagem, c.criado_em) DESC`,
        [usuario_id, usuario_id]
    )

    return result
}

async function atualizar(id) {
    return db.query("UPDATE conversa SET ultima_mensagem = NOW() WHERE id = ?", [id])
}

module.exports = {
    buscarConversaExistente,
    buscarConversa,
    criarConversa,
    listarConversa,
    atualizar
}