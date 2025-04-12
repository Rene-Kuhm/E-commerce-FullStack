const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const { validateProduct } = require('../middlewares/validator.middleware');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');

// Rutas públicas
router.get('/', ProductController.getAll);
router.get('/featured', ProductController.getFeatured);
router.get('/search', ProductController.search);
router.get('/:id', ProductController.getById);

// Rutas protegidas (solo admin)
router.post('/', isAuthenticated, validateProduct, ProductController.create);
router.put('/:id', isAuthenticated, validateProduct, ProductController.update);
router.delete('/:id', isAuthenticated, ProductController.delete);

module.exports = router;
