require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('Verificando conexión a Supabase...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? '***' + supabaseKey.slice(-4) : 'No definida');

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase URL y Key son requeridos. Por favor, configura las variables de entorno.');
  process.exit(1);
}

// Crear cliente de Supabase
try {
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Probar la conexión
  async function testConnection() {
    try {
      const { data, error } = await supabase.from('categories').select('count').limit(1);
      
      if (error) {
        console.error('Error al conectar con Supabase:', error.message);
        process.exit(1);
      }
      
      console.log('¡Conexión exitosa a Supabase!');
      console.log('Datos recibidos:', data);
    } catch (err) {
      console.error('Error inesperado:', err.message);
      process.exit(1);
    }
  }
  
  testConnection();
} catch (err) {
  console.error('Error al crear el cliente de Supabase:', err.message);
  process.exit(1);
}
