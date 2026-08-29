const express = require("express");

const router = express.Router();

const {listarPublicos, 
    buscarPublicos

} = require("../controllers/postController");

router.get("/", listarPublicos);
router.get("/", buscarPublicos);

module.exports = router;