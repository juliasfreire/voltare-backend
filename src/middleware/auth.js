const jwt = require("jsonwebtoken")

//Faz a verificação se o usuário tem ou não o token
function auth(req,res,next){
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({
            mensagem: "Token não informado"
        })
    }

    //Pega a string do header, corta espaços brancos, e pega o elemento de segunda posição (token)
    const token = authHeader.split(" ")[1]

    //Faz verificação do token válido ou se estar expirado e avança
    jwt.verify(token, process.env.JWT_SECRET, (error,decoded) => {
        if(error){
            return res.status(401).json({
                mensagem: "Token inválido ou expirado"
            })
        }

        req.usuario = decoded

        return next()
    })

}

function apenasPrestadores(req,res,next){

    auth(req,res, () => {
        if(req.usuario && req.usuario.tipo === "prestador"){
            return next()
        }
        return res.status(403).json({
            mensagem: "Entrada permitida somente para prestadores"
        })
    })

    
}

function apenasClientes(req,res,next){
    auth(req,res,()=>{
        if(req.usuario && req.usuario.tipo === "cliente"){
            return next()
        } 
        return res.status(403).json({
            mensagem: "Entrada permitida apenas para clientes"
        })
    })

   
}

module.exports = {
    auth,
    apenasPrestadores,
    apenasClientes
}