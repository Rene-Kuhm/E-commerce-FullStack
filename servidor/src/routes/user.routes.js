const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');

// Todas las rutas requieren autenticación
router.use(isAuthenticated);

router.get('/profile', UserController.getProfile);
router.put('/profile', UserController.updateProfile);
router.get('/addresses', UserController.getAddresses);

module.exports = router;
