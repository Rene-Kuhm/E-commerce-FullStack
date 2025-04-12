const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');
const User = require('../models/user.model');

/**
 * Controlador para manejar la autenticación
 */
class AuthController {
  /**
   * Registrar un nuevo usuario
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async register(req, res) {
    try {
      const { email, password, first_name, last_name } = req.body;

      // Verificar si el usuario ya existe
      const existingUser = await User.getByEmail(email).catch(() => null);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'El correo electrónico ya está registrado'
        });
      }

      // Crear usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        return res.status(400).json({
          success: false,
          message: 'Error al registrar el usuario',
          error: authError.message
        });
      }

      // Crear usuario en nuestra tabla personalizada
      const userData = {
        id: authData.user.id,
        email,
        first_name,
        last_name,
        role: 'customer' // Por defecto, todos los usuarios son clientes
      };

      const newUser = await User.create(userData);

      // Generar token JWT
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.status(201).json({
        success: true,
        message: 'Usuario registrado correctamente',
        data: {
          user: {
            id: newUser.id,
            email: newUser.email,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            role: newUser.role
          },
          token
        }
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({
        success: false,
        message: 'Error al registrar el usuario',
        error: error.message
      });
    }
  }

  /**
   * Iniciar sesión
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Autenticar con Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas',
          error: authError.message
        });
      }

      // Obtener datos del usuario de nuestra tabla
      const user = await User.getById(authData.user.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      // Generar token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        data: {
          user: {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role
          },
          token
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({
        success: false,
        message: 'Error al iniciar sesión',
        error: error.message
      });
    }
  }

  /**
   * Obtener el perfil del usuario actual
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.getById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      res.status(200).json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          created_at: user.created_at
        }
      });
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener el perfil',
        error: error.message
      });
    }
  }

  /**
   * Solicitar restablecimiento de contraseña
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.FRONTEND_URL}/reset-password`,
      });

      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Error al solicitar restablecimiento de contraseña',
          error: error.message
        });
      }

      res.status(200).json({
        success: true,
        message: 'Se ha enviado un correo para restablecer la contraseña'
      });
    } catch (error) {
      console.error('Error en forgot password:', error);
      res.status(500).json({
        success: false,
        message: 'Error al solicitar restablecimiento de contraseña',
        error: error.message
      });
    }
  }

  /**
   * Restablecer contraseña
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async resetPassword(req, res) {
    try {
      const { password } = req.body;

      const { error } = await supabase.auth.updateUser({
        password
      });

      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Error al restablecer la contraseña',
          error: error.message
        });
      }

      res.status(200).json({
        success: true,
        message: 'Contraseña restablecida correctamente'
      });
    } catch (error) {
      console.error('Error en reset password:', error);
      res.status(500).json({
        success: false,
        message: 'Error al restablecer la contraseña',
        error: error.message
      });
    }
  }

  /**
   * Cerrar sesión
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async logout(req, res) {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Error al cerrar sesión',
          error: error.message
        });
      }

      res.status(200).json({
        success: true,
        message: 'Sesión cerrada correctamente'
      });
    } catch (error) {
      console.error('Error en logout:', error);
      res.status(500).json({
        success: false,
        message: 'Error al cerrar sesión',
        error: error.message
      });
    }
  }
}

module.exports = AuthController;
