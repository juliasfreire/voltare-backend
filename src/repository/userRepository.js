const db = require("../config/database")

async function cadastrarRepository(nome, email, senhaHash, tipo) {
    const [result] = await db.query(
        "INSERT INTO usuario(nome, email, senha, tipo) VALUES(?,?,?,?)",
        [nome, email, senhaHash, tipo]
    )

    return result.insertId
}

//Participa da parte de cadastro e login
async function buscarEmail(email) {
    const [usuarios] = await db.query(
        "SELECT * FROM usuario WHERE email = ?",
        [email]
    )

    if(usuarios.length === 0){
        return null
    }

    return usuarios[0]
}

module.exports = {
    cadastrarRepository,
    buscarEmail
}
