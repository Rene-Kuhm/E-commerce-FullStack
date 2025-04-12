import axios from 'axios';
import API_URL from '../config/api';

const orderService = {
  getUserOrders: async () => {
    try {
      const response = await axios.get(`${API_URL}/orders`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener pedidos' };
    }
  },

  getOrderById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/orders/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener el pedido' };
    }
  },

  createOrder: async (orderData) => {
    try {
      const response = await axios.post(`${API_URL}/orders`, orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al crear el pedido' };
    }
  },

  getUserStats: async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/stats`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener estadísticas' };
    }
  }
};

export default orderService;
