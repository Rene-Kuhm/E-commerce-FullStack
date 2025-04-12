import axios from 'axios';
import API_URL from '../config/api';

const cartService = {
  getCart: async () => {
    try {
      const response = await axios.get(`${API_URL}/cart`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener el carrito' };
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await axios.post(`${API_URL}/cart/items`, {
        product_id: productId,
        quantity
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al añadir al carrito' };
    }
  },

  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await axios.put(`${API_URL}/cart/items/${itemId}`, {
        quantity
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al actualizar el carrito' };
    }
  },

  removeFromCart: async (itemId) => {
    try {
      const response = await axios.delete(`${API_URL}/cart/items/${itemId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al eliminar del carrito' };
    }
  },

  clearCart: async () => {
    try {
      const response = await axios.delete(`${API_URL}/cart`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al vaciar el carrito' };
    }
  }
};

export default cartService;
