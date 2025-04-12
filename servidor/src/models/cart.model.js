const supabase = require('../config/supabase');

class Cart {
  /**
   * Obtener el carrito de un usuario
   * @param {string} userId - ID del usuario
   * @returns {Promise<Object>} - Carrito con items
   */
  static async getByUserId(userId) {
    // Primero obtenemos el carrito del usuario
    const { data: cart, error: cartError } = await supabase
      .from('carts')
      .select('id, user_id, created_at, updated_at')
      .eq('user_id', userId)
      .single();

    if (cartError && cartError.code !== 'PGRST116') {
      throw cartError;
    }

    // Si no existe el carrito, lo creamos
    if (!cart) {
      const { data: newCart, error: newCartError } = await supabase
        .from('carts')
        .insert([{ user_id: userId }])
        .select()
        .single();

      if (newCartError) throw newCartError;
      
      return { ...newCart, items: [] };
    }

    // Obtenemos los items del carrito
    const { data: items, error: itemsError } = await supabase
      .from('cart_items')
      .select(`
        id, 
        cart_id, 
        product_id, 
        quantity, 
        products(id, name, price, image_url, stock)
      `)
      .eq('cart_id', cart.id);

    if (itemsError) throw itemsError;

    return { ...cart, items };
  }

  /**
   * Añadir un producto al carrito
   * @param {string} cartId - ID del carrito
   * @param {string} productId - ID del producto
   * @param {number} quantity - Cantidad
   * @returns {Promise<Object>} - Item añadido
   */
  static async addItem(cartId, productId, quantity = 1) {
    // Verificamos si el producto ya está en el carrito
    const { data: existingItem, error: checkError } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('cart_id', cartId)
      .eq('product_id', productId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    // Si el producto ya está en el carrito, actualizamos la cantidad
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', existingItem.id)
        .select();

      if (error) throw error;
      return data[0];
    }

    // Si el producto no está en el carrito, lo añadimos
    const { data, error } = await supabase
      .from('cart_items')
      .insert([{ cart_id: cartId, product_id: productId, quantity }])
      .select();

    if (error) throw error;
    return data[0];
  }

  /**
   * Actualizar la cantidad de un item del carrito
   * @param {string} itemId - ID del item
   * @param {number} quantity - Nueva cantidad
   * @returns {Promise<Object>} - Item actualizado
   */
  static async updateItemQuantity(itemId, quantity) {
    if (quantity <= 0) {
      return this.removeItem(itemId);
    }

    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)
      .select();

    if (error) throw error;
    return data[0];
  }

  /**
   * Eliminar un item del carrito
   * @param {string} itemId - ID del item
   * @returns {Promise<boolean>} - Resultado de la operación
   */
  static async removeItem(itemId) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) throw error;
    return true;
  }

  /**
   * Vaciar un carrito
   * @param {string} cartId - ID del carrito
   * @returns {Promise<boolean>} - Resultado de la operación
   */
  static async clear(cartId) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cartId);

    if (error) throw error;
    return true;
  }
}

module.exports = Cart;
