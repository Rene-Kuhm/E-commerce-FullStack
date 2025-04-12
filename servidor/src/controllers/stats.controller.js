const Order = require('../models/order.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');

/**
 * Controlador para estadísticas del dashboard
 */
class StatsController {
  /**
   * Obtener estadísticas de pedidos
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async getOrderStats(req, res) {
    try {
      // Obtener estadísticas de pedidos
      const stats = await Order.getStats();
      
      res.status(200).json({
        success: true,
        message: 'Estadísticas de pedidos obtenidas correctamente',
        data: {
          totalOrders: stats.total_orders || 0,
          totalSales: stats.total_sales || 0,
          averageOrderValue: stats.average_order_value || 0,
          pendingOrders: stats.pending_orders || 0
        }
      });
    } catch (error) {
      console.error('Error al obtener estadísticas de pedidos:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener estadísticas de pedidos',
        error: error.message
      });
    }
  }

  /**
   * Obtener conteo de productos
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async getProductCount(req, res) {
    try {
      const count = await Product.getCount();
      
      res.status(200).json({
        success: true,
        message: 'Conteo de productos obtenido correctamente',
        data: {
          count
        }
      });
    } catch (error) {
      console.error('Error al obtener conteo de productos:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener conteo de productos',
        error: error.message
      });
    }
  }

  /**
   * Obtener conteo de usuarios
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async getUserCount(req, res) {
    try {
      const count = await User.getCount();
      
      res.status(200).json({
        success: true,
        message: 'Conteo de usuarios obtenido correctamente',
        data: {
          count
        }
      });
    } catch (error) {
      console.error('Error al obtener conteo de usuarios:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener conteo de usuarios',
        error: error.message
      });
    }
  }
}

module.exports = StatsController;
