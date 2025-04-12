const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { validateRegister, validateLogin } = require('../middlewares/validator.middleware');
const { isAuthenticated } = require('../middlewares/auth.middleware');

// Rutas públicas
router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);

// Rutas protegidas
router.get('/profile', isAuthenticated, AuthController.getProfile);
router.post('/logout', isAuthenticated, AuthController.logout);

module.exports = router;
