const express = require('express');
const router = express.Router();
const path = require('path');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');

// Ruta para servir el dashboard (requiere autenticación)
router.get('/', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/dashboard/index.html'));
});

module.exports = router;
