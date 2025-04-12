const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart.controller');
const { validateCartItem, validateItemQuantity } = require('../middlewares/validator.middleware');
const { isAuthenticated } = require('../middlewares/auth.middleware');

// Todas las rutas requieren autenticación
router.use(isAuthenticated);

router.get('/', CartController.getCart);
router.post('/items', validateCartItem, CartController.addItem);
router.put('/items/:item_id', validateItemQuantity, CartController.updateItemQuantity);
router.delete('/items/:item_id', CartController.removeItem);
router.delete('/', CartController.clearCart);

module.exports = router;
