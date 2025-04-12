const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order.controller');
const { validateOrder, validateOrderStatus } = require('../middlewares/validator.middleware');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');

// Todas las rutas requieren autenticación
router.use(isAuthenticated);

router.get('/', OrderController.getUserOrders);
router.get('/stats', OrderController.getUserStats);
router.get('/:id', OrderController.getOrderById);
router.post('/', validateOrder, OrderController.createOrder);

// Rutas solo para admin
router.put('/:id/status', validateOrderStatus, OrderController.updateOrderStatus);

module.exports = router;
