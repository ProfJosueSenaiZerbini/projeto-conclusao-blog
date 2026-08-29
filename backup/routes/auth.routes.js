const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/login', authController.renderLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);

module.exports = router;