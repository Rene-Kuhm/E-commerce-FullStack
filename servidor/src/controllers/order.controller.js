const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

/**
 * Controlador para manejar órdenes/pedidos
 */
class OrderController {
  /**
   * Obtener todas las órdenes del usuario actual
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async getUserOrders(req, res) {
    try {
      const userId = req.user.id;
      const orders = await Order.getByUserId(userId);

      res.status(200).json({
        success: true,
        data: orders
      });
    } catch (error) {
      console.error('Error al obtener órdenes:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener las órdenes',
        error: error.message
      });
    }
  }

  /**
   * Obtener una orden específica
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async getOrderById(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      
      const order = await Order.getById(id);
      
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Orden no encontrada'
        });
      }
      
      // Verificar que la orden pertenece al usuario o es admin
      if (order.user_id !== userId && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'No tienes permiso para ver esta orden'
        });
      }

      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      console.error('Error al obtener orden:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener la orden',
        error: error.message
      });
    }
  }

  /**
   * Crear una nueva orden a partir del carrito
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async createOrder(req, res) {
    try {
      const userId = req.user.id;
      const { shipping_address, payment_method, notes } = req.body;
      
      // Obtener el carrito del usuario
      const cart = await Cart.getByUserId(userId);
      
      // Verificar que el carrito tenga items
      if (!cart.items || cart.items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'El carrito está vacío'
        });
      }

      // Calcular el total y verificar stock
      let totalAmount = 0;
      const orderItems = [];
      
      for (const item of cart.items) {
        const product = await Product.getById(item.product_id);
        
        // Verificar stock
        if (product.stock < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `No hay suficiente stock para ${product.name}`
          });
        }
        
        // Calcular subtotal
        const itemPrice = product.price;
        const subtotal = itemPrice * item.quantity;
        totalAmount += subtotal;
        
        // Añadir a los items de la orden
        orderItems.push({
          product_id: item.product_id,
          quantity: item.quantity,
          price: itemPrice
        });
        
        // Actualizar stock del producto
        await Product.update(product.id, {
          stock: product.stock - item.quantity
        });
      }
      
      // Crear la orden
      const orderData = {
        user_id: userId,
        status: 'pending',
        total_amount: totalAmount,
        shipping_address,
        payment_method,
        notes
      };
      
      const newOrder = await Order.create(orderData, orderItems);
      
      // Vaciar el carrito
      await Cart.clear(cart.id);

      res.status(201).json({
        success: true,
        message: 'Orden creada correctamente',
        data: newOrder
      });
    } catch (error) {
      console.error('Error al crear orden:', error);
      res.status(500).json({
        success: false,
        message: 'Error al crear la orden',
        error: error.message
      });
    }
  }

  /**
   * Actualizar el estado de una orden (solo admin)
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async updateOrderStatus(req, res) {
    try {
      // Verificar permisos (solo admin)
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'No tienes permisos para actualizar órdenes'
        });
      }

      const { id } = req.params;
      const { status } = req.body;
      
      // Verificar estado válido
      const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Estado no válido'
        });
      }
      
      // Verificar si la orden existe
      const existingOrder = await Order.getById(id);
      if (!existingOrder) {
        return res.status(404).json({
          success: false,
          message: 'Orden no encontrada'
        });
      }
      
      // Actualizar estado
      const updatedOrder = await Order.updateStatus(id, status);

      res.status(200).json({
        success: true,
        message: 'Estado de la orden actualizado',
        data: updatedOrder
      });
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el estado de la orden',
        error: error.message
      });
    }
  }

  /**
   * Obtener estadísticas de órdenes del usuario
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async getUserStats(req, res) {
    try {
      const userId = req.user.id;
      const stats = await Order.getUserStats(userId);

      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener estadísticas de órdenes',
        error: error.message
      });
    }
  }
}

module.exports = OrderController;
