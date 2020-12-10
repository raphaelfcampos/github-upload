const express = require('express');
const router = express.Router();

const UsuariosController = require('../controllers/users-controller');

router.post('/signIn', UsuariosController.SignIn)
router.put('/signOut', UsuariosController.SignOut)
router.post('/create-session', UsuariosController.CreateSession)
router.get('/session-validation', UsuariosController.SessionValidation)

module.exports = router;