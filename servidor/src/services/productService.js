import axios from 'axios';
import API_URL from '../config/api';

const productService = {
  getAllProducts: async (params = {}) => {
    try {
      const response = await axios.get(`${API_URL}/products`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener productos' };
    }
  },

  getProductById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener el producto' };
    }
  },

  getFeaturedProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/products/featured`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener productos destacados' };
    }
  },

  searchProducts: async (query) => {
    try {
      const response = await axios.get(`${API_URL}/products/search`, { params: { query } });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al buscar productos' };
    }
  }
};

export default productService;
