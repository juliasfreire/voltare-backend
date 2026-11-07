const userRepository = require("../repository/userRepository")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()

async function cadastrarService(nome, email, senha, tipo) {
    if(!nome || !email || !senha){
        throw Object.assign(new Error("Preencha todos os campos"), { status: 400 })
    }

    const tipoUsuario = tipo === "prestador" ? "prestador" : "cliente"

    const usuarioExistente = await userRepository.buscarEmail(email)
    if(usuarioExistente){
        throw Object.assign(new Error("Email já cadastrado"), { status: 409})
    }

    const senhaHash = await bcrypt.hash(senha,10)

    await userRepository.cadastrarRepository(nome, email, senhaHash, tipoUsuario)
}

async function loginService(email, senha) {
    const usuario = await userRepository.buscarEmail(email)

    if(!usuario){
        throw Object.assign(new Error("Credenciais invalidas"), { status: 401 })
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha)
    
    if(!senhaValida){
        throw Object.assign(new Error("Credenciais invalidas"), { status: 401 })
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