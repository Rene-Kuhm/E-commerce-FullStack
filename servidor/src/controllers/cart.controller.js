const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

/**
 * Controlador para manejar el carrito de compras
 */
class CartController {
  /**
   * Obtener el carrito del usuario actual
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async getCart(req, res) {
    try {
      const userId = req.user.id;
      const cart = await Cart.getByUserId(userId);

      res.status(200).json({
        success: true,
        data: cart
      });
    } catch (error) {
      console.error('Error al obtener carrito:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener el carrito',
        error: error.message
      });
    }
  }

  /**
   * Añadir un producto al carrito
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async addItem(req, res) {
    try {
      const userId = req.user.id;
      const { product_id, quantity } = req.body;

      // Verificar si el producto existe y tiene stock
      const product = await Product.getById(product_id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: 'No hay suficiente stock disponible'
        });
      }

      // Obtener el carrito del usuario
      const cart = await Cart.getByUserId(userId);
      
      // Añadir el producto al carrito
      await Cart.addItem(cart.id, product_id, quantity);
      
      // Obtener el carrito actualizado
      const updatedCart = await Cart.getByUserId(userId);

      res.status(200).json({
        success: true,
        message: 'Producto añadido al carrito',
        data: updatedCart
      });
    } catch (error) {
      console.error('Error al añadir item al carrito:', error);
      res.status(500).json({
        success: false,
        message: 'Error al añadir producto al carrito',
        error: error.message
      });
    }
  }

  /**
   * Actualizar la cantidad de un item en el carrito
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async updateItemQuantity(req, res) {
    try {
      const userId = req.user.id;
      const { item_id } = req.params;
      const { quantity } = req.body;

      // Verificar que el item pertenece al carrito del usuario
      const cart = await Cart.getByUserId(userId);
      const itemBelongsToUser = cart.items.some(item => item.id === item_id);
      
      if (!itemBelongsToUser) {
        return res.status(403).json({
          success: false,
          message: 'No tienes permiso para modificar este item'
        });
      }

      // Verificar stock si se está aumentando la cantidad
      const item = cart.items.find(item => item.id === item_id);
      if (quantity > item.quantity) {
        const product = await Product.getById(item.product_id);
        if (product.stock < quantity) {
          return res.status(400).json({
            success: false,
            message: 'No hay suficiente stock disponible'
          });
        }
      }

      // Actualizar la cantidad
      await Cart.updateItemQuantity(item_id, quantity);
      
      // Obtener el carrito actualizado
      const updatedCart = await Cart.getByUserId(userId);

      res.status(200).json({
        success: true,
        message: 'Cantidad actualizada',
        data: updatedCart
      });
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la cantidad',
        error: error.message
      });
    }
  }

  /**
   * Eliminar un item del carrito
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async removeItem(req, res) {
    try {
      const userId = req.user.id;
      const { item_id } = req.params;

      // Verificar que el item pertenece al carrito del usuario
      const cart = await Cart.getByUserId(userId);
      const itemBelongsToUser = cart.items.some(item => item.id === item_id);
      
      if (!itemBelongsToUser) {
        return res.status(403).json({
          success: false,
          message: 'No tienes permiso para eliminar este item'
        });
      }

      // Eliminar el item
      await Cart.removeItem(item_id);
      
      // Obtener el carrito actualizado
      const updatedCart = await Cart.getByUserId(userId);

      res.status(200).json({
        success: true,
        message: 'Item eliminado del carrito',
        data: updatedCart
      });
    } catch (error) {
      console.error('Error al eliminar item:', error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar el item del carrito',
        error: error.message
      });
    }
  }

  /**
   * Vaciar el carrito
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async clearCart(req, res) {
    try {
      const userId = req.user.id;
      
      // Obtener el carrito del usuario
      const cart = await Cart.getByUserId(userId);
      
      // Vaciar el carrito
      await Cart.clear(cart.id);

      res.status(200).json({
        success: true,
        message: 'Carrito vaciado correctamente',
        data: { id: cart.id, user_id: userId, items: [] }
      });
    } catch (error) {
      console.error('Error al vaciar carrito:', error);
      res.status(500).json({
        success: false,
        message: 'Error al vaciar el carrito',
        error: error.message
      });
    }
  }
}

module.exports = CartController;
