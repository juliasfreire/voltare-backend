const express = require("express")
const router = express.Router()

const servicoController = require("../controller/servicoController")
const {auth, apenasPrestadores} = require("../middleware/auth")

router.post("/", apenasPrestadores, servicoController.novoServico)
router.get("/meus", apenasPrestadores, servicoController.listarMeusServicos)
router.get("/", auth, servicoController.todosServicos)
router.put("/:id", apenasPrestadores, servicoController.atualizarServico)
router.delete("/:id", apenasPrestadores, servicoController.deletarServico)

module.exports = router;