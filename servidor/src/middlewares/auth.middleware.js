const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('../models/user.model');

/**
 * Middleware para verificar si el usuario está autenticado
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Next middleware
 */
const isAuthenticated = async (req, res, next) => {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Si es una solicitud al dashboard, redirigir a la página de login
      if (req.path === '/' && req.baseUrl === '/dashboard') {
        return res.sendFile(path.join(__dirname, '../../public/dashboard/index.html'));
      }

      return res.status(401).json({
        success: false,
        message: 'No autorizado, token no proporcionado'
      });
    }

    const token = authHeader.split(' ')[1];

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar si el usuario existe
    const user = await User.getById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Añadir usuario al request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado'
      });
    }

    console.error('Error en autenticación:', error);
    res.status(500).json({
      success: false,
      message: 'Error en la autenticación',
      error: error.message
    });
  }
};

/**
 * Middleware para verificar si el usuario es administrador
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Next middleware
 */
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  res.status(403).json({
    success: false,
    message: 'Acceso denegado, se requieren permisos de administrador'
  });
};

module.exports = {
  isAuthenticated,
  isAdmin
};
