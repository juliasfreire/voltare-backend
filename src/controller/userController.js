const userService = require("../service/userService")

async function cadastro(req,res){
    try {
        const{nome, email, senha, tipo} = req.body

        if(!nome || !email || !senha || !tipo){
            return res.status(400).json({
                mensagem: "Digite todos os campos"
            })
        }

        await userService.cadastrarService(nome, email, senha, tipo)

        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso"
        })
    } catch (error) {
        console.error(error)

        if(error.message === "Email já cadastrado"){
            return res.status(400).json({
                mensagem: "Email já cadastrado"
            })
        }else{
            return res.status(500).json({
                mensagem: "Erro interno no servidor"
            })
        }

        
    }
}

async function login(req,res) {
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
        console.error(error)
        if(error.message === "Credenciais invalidas"){
            return res.status(401).json({
                mensagem: "Email ou senha inválidos"
            })
        }else{
            return res.status(500).json({
                mensagem: "Erro interno no servidor"
            })
        }
        
    }
    
}

module.exports = {
    cadastro,
    login
}