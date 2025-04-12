const supabase = require('../config/supabase');

class Order {
  /**
   * Obtener todas las órdenes de un usuario
   * @param {string} userId - ID del usuario
   * @returns {Promise<Array>} - Lista de órdenes
   */
  static async getByUserId(userId) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id, 
        user_id, 
        status, 
        total_amount, 
        shipping_address, 
        payment_method,
        created_at, 
        updated_at
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Obtener una orden por su ID
   * @param {string} id - ID de la orden
   * @returns {Promise<Object>} - Datos de la orden con sus items
   */
  static async getById(id) {
    // Obtenemos la orden
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        id, 
        user_id, 
        status, 
        total_amount, 
        shipping_address, 
        payment_method,
        tracking_number,
        notes,
        created_at, 
        updated_at
      `)
      .eq('id', id)
      .single();

    if (orderError) throw orderError;

    // Obtenemos los items de la orden
    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select(`
        id, 
        order_id, 
        product_id, 
        quantity, 
        price,
        products(id, name, image_url)
      `)
      .eq('order_id', id);

    if (itemsError) throw itemsError;

    return { ...order, items };
  }

  /**
   * Crear una nueva orden
   * @param {Object} orderData - Datos de la orden
   * @param {Array} items - Items de la orden
   * @returns {Promise<Object>} - Orden creada
   */
  static async create(orderData, items) {
    // Iniciamos una transacción
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (orderError) throw orderError;

    // Preparamos los items para insertar
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }));

    // Insertamos los items
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return this.getById(order.id);
  }

  /**
   * Actualizar el estado de una orden
   * @param {string} id - ID de la orden
   * @param {string} status - Nuevo estado
   * @returns {Promise<Object>} - Orden actualizada
   */
  static async updateStatus(id, status) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date() })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  }

  /**
   * Obtener estadísticas de órdenes para un usuario
   * @param {string} userId - ID del usuario
   * @returns {Promise<Object>} - Estadísticas
   */
  static async getUserStats(userId) {
    const { data, error } = await supabase
      .from('orders')
      .select('status, total_amount')
      .eq('user_id', userId);

    if (error) throw error;

    const totalOrders = data.length;
    const totalSpent = data.reduce((sum, order) => sum + order.total_amount, 0);
    
    const statusCounts = data.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    return {
      totalOrders,
      totalSpent,
      statusCounts
    };
  }
}

module.exports = Order;
