const express = require('express');
const router = express.Router();
const StatsController = require('../controllers/stats.controller');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');

// Todas las rutas requieren autenticación
router.use(isAuthenticated);

// Estadísticas para el dashboard
router.get('/orders', StatsController.getOrderStats);
router.get('/products/count', StatsController.getProductCount);
router.get('/users/count', StatsController.getUserCount);

module.exports = router;
