const { validationResult, body, param, query } = require('express-validator');

/**
 * Middleware para manejar errores de validación
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Next middleware
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors: errors.array()
    });
  }
  next();
};

/**
 * Validaciones para registro de usuario
 */
const validateRegister = [
  body('email')
    .isEmail()
    .withMessage('Debe proporcionar un email válido')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('first_name')
    .notEmpty()
    .withMessage('El nombre es requerido'),
  body('last_name')
    .notEmpty()
    .withMessage('El apellido es requerido'),
  handleValidationErrors
];

/**
 * Validaciones para login
 */
const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Debe proporcionar un email válido')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida'),
  handleValidationErrors
];

/**
 * Validaciones para creación de producto
 */
const validateProduct = [
  body('name')
    .notEmpty()
    .withMessage('El nombre del producto es requerido'),
  body('price')
    .isNumeric()
    .withMessage('El precio debe ser un número')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser mayor o igual a 0'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero mayor o igual a 0'),
  body('category_id')
    .notEmpty()
    .withMessage('La categoría es requerida'),
  handleValidationErrors
];

/**
 * Validaciones para añadir item al carrito
 */
const validateCartItem = [
  body('product_id')
    .notEmpty()
    .withMessage('El ID del producto es requerido'),
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser un número entero mayor a 0'),
  handleValidationErrors
];

/**
 * Validaciones para actualizar cantidad de item
 */
const validateItemQuantity = [
  param('item_id')
    .notEmpty()
    .withMessage('El ID del item es requerido'),
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser un número entero mayor a 0'),
  handleValidationErrors
];

/**
 * Validaciones para crear orden
 */
const validateOrder = [
  body('shipping_address')
    .notEmpty()
    .withMessage('La dirección de envío es requerida'),
  body('payment_method')
    .notEmpty()
    .withMessage('El método de pago es requerido'),
  handleValidationErrors
];

/**
 * Validaciones para actualizar estado de orden
 */
const validateOrderStatus = [
  param('id')
    .notEmpty()
    .withMessage('El ID de la orden es requerido'),
  body('status')
    .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
    .withMessage('Estado no válido'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateProduct,
  validateCartItem,
  validateItemQuantity,
  validateOrder,
  validateOrderStatus
};
