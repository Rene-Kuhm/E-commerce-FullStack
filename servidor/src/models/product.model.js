const supabase = require('../config/supabase');

class Product {
  /**
   * Obtener todos los productos con paginación
   * @param {number} page - Número de página
   * @param {number} limit - Límite de productos por página
   * @param {Object} filters - Filtros adicionales
   * @returns {Promise<Object>} - Productos y metadatos
   */
  static async getAll(page = 1, limit = 10, filters = {}) {
    const offset = (page - 1) * limit;
    
    let query = supabase
      .from('products')
      .select('*, categories(id, name)', { count: 'exact' });
    
    // Aplicar filtros si existen
    if (filters.category_id) {
      query = query.eq('category_id', filters.category_id);
    }
    
    if (filters.min_price) {
      query = query.gte('price', filters.min_price);
    }
    
    if (filters.max_price) {
      query = query.lte('price', filters.max_price);
    }
    
    if (filters.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }
    
    // Aplicar paginación
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) throw error;
    
    return {
      products: data,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  /**
   * Obtener un producto por su ID
   * @param {string} id - ID del producto
   * @returns {Promise<Object>} - Datos del producto
   */
  static async getById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(id, name)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Crear un nuevo producto
   * @param {Object} productData - Datos del producto
   * @returns {Promise<Object>} - Producto creado
   */
  static async create(productData) {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select();

    if (error) throw error;
    return data[0];
  }

  /**
   * Actualizar un producto
   * @param {string} id - ID del producto
   * @param {Object} productData - Datos a actualizar
   * @returns {Promise<Object>} - Producto actualizado
   */
  static async update(id, productData) {
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  }

  /**
   * Eliminar un producto
   * @param {string} id - ID del producto
   * @returns {Promise<boolean>} - Resultado de la operación
   */
  static async delete(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  /**
   * Obtener productos destacados
   * @param {number} limit - Límite de productos
   * @returns {Promise<Array>} - Lista de productos destacados
   */
  static async getFeatured(limit = 6) {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(id, name)')
      .eq('is_featured', true)
      .limit(limit);

    if (error) throw error;
    return data;
  }

  /**
   * Buscar productos
   * @param {string} query - Texto de búsqueda
   * @param {number} limit - Límite de resultados
   * @returns {Promise<Array>} - Resultados de la búsqueda
   */
  static async search(query, limit = 10) {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(id, name)')
      .or(`name.ilike.%${query}%, description.ilike.%${query}%`)
      .limit(limit);

    if (error) throw error;
    return data;
  }
}

module.exports = Product;
