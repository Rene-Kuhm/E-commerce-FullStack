const User = require('../models/user.model');

/**
 * Controlador para manejar usuarios
 */
class UserController {
  /**
   * Obtener perfil del usuario actual
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
   * Actualizar perfil del usuario
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const { first_name, last_name } = req.body;
      
      const updatedUser = await User.update(userId, {
        first_name,
        last_name,
        updated_at: new Date()
      });

      res.status(200).json({
        success: true,
        message: 'Perfil actualizado correctamente',
        data: {
          id: updatedUser.id,
          email: updatedUser.email,
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name,
          role: updatedUser.role
        }
      });
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el perfil',
        error: error.message
      });
    }
  }

  /**
   * Obtener direcciones del usuario
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async getAddresses(req, res) {
    try {
      const userId = req.user.id;
      const addresses = await User.getAddresses(userId);

      res.status(200).json({
        success: true,
        data: addresses
      });
    } catch (error) {
      console.error('Error al obtener direcciones:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener las direcciones',
        error: error.message
      });
    }
  }
}

module.exports = UserController;
