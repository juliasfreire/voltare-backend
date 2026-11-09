const express = require("express")
const router = express.Router()
const { auth } = require("../middleware/auth")
const conversasController = require("../controller/conversasController")

router.post("/", auth, conversasController.abrirConversa)
router.get("/", auth, conversasController.historicoConversa)
router.get("/:id/mensagens", auth, conversasController.mensagens)

module.exports = router;