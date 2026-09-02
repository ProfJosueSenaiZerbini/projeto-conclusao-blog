const express = require("express");

const router = express.Router();

const {listarPublicos, 
    buscarPublicos, criar

} = require("../controllers/postController");
const verificarAutenticacao = require("../middleware/authMiddleware");

router.get("/", listarPublicos);
router.get("/:id", buscarPublicos);
router.post("/criar", verificarAutenticacao, criar );

module.exports = router;