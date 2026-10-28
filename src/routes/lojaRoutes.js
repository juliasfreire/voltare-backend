const express = require("express")
const router = express.Router()

const lojaController = require("../controller/lojaController")
const {auth, apenasPrestadores} = require("../middleware/auth")

router.post("/", apenasPrestadores, lojaController.novoProduto)
router.get("/meus", apenasPrestadores, lojaController.meusProdutos)
router.get("/", auth, lojaController.todosProdutos)

module.exports = router;