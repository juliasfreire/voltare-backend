const db = require("../config/database")

async function criarMensagem(conversa_id, remetente_id, texto) {
    const [result] = await db.query(
        "INSERT INTO mensagem(conversa_id, remetente_id, texto) VALUES(?,?,?)",
        [conversa_id, remetente_id, texto]
    )

    const [rows] = await db.query(
        "SELECT * FROM mensagem WHERE id = ?",
        [result.insertId]
    )

    return rows[0]
}

async function listarMensagem(conversa_id, before, limit = 30) {
    const parametros = [conversa_id]
    let where = "conversa_id = ?"

    if(before){
        where += " AND id < ?"
        parametros.push(before)
    }

    parametros.push(limit)

    const [result] = await db.query(
        `SELECT * FROM mensagem WHERE ${where} ORDER BY id DESC LIMIT ?`,
        parametros
    )

    return result.reverse()
}

module.exports = {
    criarMensagem, 
    listarMensagem
}