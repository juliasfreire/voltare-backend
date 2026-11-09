const userService = require("../service/userService")

async function cadastro(req,res, next){
    try {
        const{nome, email, senha, tipo} = req.body

        if(!nome || !email || !senha){
            return res.status(400).json({
                mensagem: "Digite todos os campos"
            })
        }

        await userService.cadastrarService(nome, email, senha, tipo)

        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso"
        })
    } catch (error) {
        next(error)
    }
}

async function login(req,res, next) {
    try {

        const {email,senha} = req.body
        
        if(!email || !senha){
            return res.status(400).json({
                mensagem: "Preencha todos os campos"
            })
        }

        const token = await userService.loginService(email, senha)

        return res.json({
            mensagem: "Login realizado com sucesso",
            token
        })

    } catch (error) {
        next(error)
    }
    
}

module.exports = {
    cadastro,
    login
}