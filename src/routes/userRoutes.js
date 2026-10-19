const express = require("express")
const router = express.Router()

const userController = require("../controller/userController")

router.post("/cadastrar", userController.cadastro)
router.post("/login", userController.login)

module.exports = router;