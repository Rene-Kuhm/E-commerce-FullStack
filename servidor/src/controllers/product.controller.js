const Product = require('../models/product.model');

/**
 * Controlador para manejar productos
 */
class ProductController {
  /**
   * Obtener todos los productos con paginación y filtros
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      
      // Filtros
      const filters = {};
      if (req.query.category_id) filters.category_id = req.query.category_id;
      if (req.query.min_price) filters.min_price = parseFloat(req.query.min_price);
      if (req.query.max_price) filters.max_price = parseFloat(req.query.max_price);
      if (req.query.search) filters.search = req.query.search;

      const result = await Product.getAll(page, limit, filters);

      res.status(200).json({
        success: true,
        data: result.products,
        meta: result.meta
      });
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener productos',
        error: error.message
      });
    }
  }

  /**
   * Obtener un producto por su ID
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.getById(id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      console.error('Error al obtener producto:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener el producto',
        error: error.message
      });
    }
  }

  /**
   * Crear un nuevo producto
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async create(req, res) {
    try {
      // Verificar permisos (solo admin)
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'No tienes permisos para crear productos'
        });
      }

      const productData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        category_id: req.body.category_id,
        image_url: req.body.image_url,
        is_featured: req.body.is_featured || false,
        sku: req.body.sku
      };

      const newProduct = await Product.create(productData);

      res.status(201).json({
        success: true,
        message: 'Producto creado correctamente',
        data: newProduct
      });
    } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(500).json({
        success: false,
        message: 'Error al crear el producto',
        error: error.message
      });
    }
  }

  /**
   * Actualizar un producto
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async update(req, res) {
    try {
      // Verificar permisos (solo admin)
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'No tienes permisos para actualizar productos'
        });
      }

      const { id } = req.params;
      
      // Verificar si el producto existe
      const existingProduct = await Product.getById(id);
      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      // Datos a actualizar
      const productData = {};
      if (req.body.name) productData.name = req.body.name;
      if (req.body.description) productData.description = req.body.description;
      if (req.body.price !== undefined) productData.price = req.body.price;
      if (req.body.stock !== undefined) productData.stock = req.body.stock;
      if (req.body.category_id) productData.category_id = req.body.category_id;
      if (req.body.image_url) productData.image_url = req.body.image_url;
      if (req.body.is_featured !== undefined) productData.is_featured = req.body.is_featured;
      if (req.body.sku) productData.sku = req.body.sku;
      
      // Añadir fecha de actualización
      productData.updated_at = new Date();

      const updatedProduct = await Product.update(id, productData);

      res.status(200).json({
        success: true,
        message: 'Producto actualizado correctamente',
        data: updatedProduct
      });
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el producto',
        error: error.message
      });
    }
  }

  /**
   * Eliminar un producto
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async delete(req, res) {
    try {
      // Verificar permisos (solo admin)
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'No tienes permisos para eliminar productos'
        });
      }

      const { id } = req.params;
      
      // Verificar si el producto existe
      const existingProduct = await Product.getById(id);
      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      await Product.delete(id);

      res.status(200).json({
        success: true,
        message: 'Producto eliminado correctamente'
      });
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar el producto',
        error: error.message
      });
    }
  }

  /**
   * Obtener productos destacados
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async getFeatured(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 6;
      const featuredProducts = await Product.getFeatured(limit);

      res.status(200).json({
        success: true,
        data: featuredProducts
      });
    } catch (error) {
      console.error('Error al obtener productos destacados:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener productos destacados',
        error: error.message
      });
    }
  }

  /**
   * Buscar productos
   * @param {Object} req - Request
   * @param {Object} res - Response
   */
  static async search(req, res) {
    try {
      const { query } = req.query;
      const limit = parseInt(req.query.limit) || 10;
      
      if (!query) {
        return res.status(400).json({
          success: false,
          message: 'Se requiere un término de búsqueda'
        });
      }

      const results = await Product.search(query, limit);

      res.status(200).json({
        success: true,
        data: results
      });
    } catch (error) {
      console.error('Error al buscar productos:', error);
      res.status(500).json({
        success: false,
        message: 'Error al buscar productos',
        error: error.message
      });
    }
  }
}

module.exports = ProductController;
