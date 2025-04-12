const logger = require('../config/logger');

/**
 * Middleware para manejar errores 404 (rutas no encontradas)
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Next middleware
 */
const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Middleware para manejar errores generales
 * @param {Error} err - Error
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Next middleware
 */
const errorHandler = (err, req, res, next) => {
  // Determinar el código de estado
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Registrar el error
  logger.error(`${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
  // Si hay un stack trace y estamos en desarrollo, lo registramos
  if (err.stack && process.env.NODE_ENV === 'development') {
    logger.error(err.stack);
  }
  
  // Enviar respuesta de error
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    // En producción, no enviamos el stack trace al cliente
  });
};

module.exports = {
  notFound,
  errorHandler
};
