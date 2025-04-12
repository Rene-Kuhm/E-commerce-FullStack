const supabase = require('../config/supabase');

class User {
  /**
   * Obtener un usuario por su ID
   * @param {string} id - ID del usuario
   * @returns {Promise<Object>} - Datos del usuario
   */
  static async getById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, role, created_at, updated_at')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Obtener un usuario por su email
   * @param {string} email - Email del usuario
   * @returns {Promise<Object>} - Datos del usuario
   */
  static async getByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Crear un nuevo usuario
   * @param {Object} userData - Datos del usuario
   * @returns {Promise<Object>} - Usuario creado
   */
  static async create(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select();

    if (error) throw error;
    return data[0];
  }

  /**
   * Actualizar un usuario
   * @param {string} id - ID del usuario
   * @param {Object} userData - Datos a actualizar
   * @returns {Promise<Object>} - Usuario actualizado
   */
  static async update(id, userData) {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  }

  /**
   * Eliminar un usuario
   * @param {string} id - ID del usuario
   * @returns {Promise<boolean>} - Resultado de la operación
   */
  static async delete(id) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  /**
   * Obtener direcciones de un usuario
   * @param {string} userId - ID del usuario
   * @returns {Promise<Array>} - Lista de direcciones
   */
  static async getAddresses(userId) {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  }
}

module.exports = User;
