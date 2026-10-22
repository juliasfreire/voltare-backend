const userRepository = require("../repository/userRepository")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()

async function cadastrarService(nome, email, senha, tipo) {
    if(!nome || !email || !senha){
        throw new Error("Preencha todos os campos")
    }

    const tipoUsuario = tipo === "prestador" ? "prestador" : "cliente"

    const usuarioExistente = await userRepository.buscarEmail(email)
    if(usuarioExistente){
        throw new Error("Email já cadastrado")
    }

    const senhaHash = await bcrypt.hash(senha,10)

    await userRepository.cadastrarRepository(nome, email, senhaHash, tipoUsuario)
}

async function loginService(email, senha) {
    const usuario = await userRepository.buscarEmail(email)

    if(!usuario){
        throw new Error("Credenciais invalidas")
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha)
    
    if(!senhaValida){
        throw new Error("Credenciais invalidas")
    }
    
    const token = jwt.sign(
        {
            id: usuario.id,
            email: usuario.email,
            tipo: usuario.tipo
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    )

    return token
}

module.exports = {
    cadastrarService,
    loginService
}