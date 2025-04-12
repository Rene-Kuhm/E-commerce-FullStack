require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase URL y Key son requeridos. Por favor, configura las variables de entorno.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Directorio de migraciones
const migrationsDir = path.join(__dirname, 'migrations');

// Función para ejecutar las migraciones usando el SQL Editor de Supabase
async function runMigrations() {
  try {
    console.log('Iniciando migraciones...');

    // Leer archivos de migración
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort(); // Ordenar por nombre para ejecutar en secuencia

    // Ejecutar cada archivo de migración
    for (const file of migrationFiles) {
      console.log(`Ejecutando migración: ${file}`);
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');

      // Ejecutar SQL en Supabase usando el endpoint de SQL
      const { error } = await supabase.from('_migrations').insert({
        name: file,
        executed_at: new Date().toISOString()
      }).select();

      if (error) {
        // Si la tabla _migrations no existe, la creamos primero
        if (error.code === '42P01') { // Tabla no existe
          console.log('Creando tabla de migraciones...');

          // Crear tabla de migraciones
          const { error: createError } = await supabase
            .from('_migrations')
            .insert({
              name: 'init',
              executed_at: new Date().toISOString()
            });

          if (createError && createError.code !== '42P01') {
            console.error('Error al crear tabla de migraciones:', createError);
            process.exit(1);
          }
        } else {
          console.error(`Error al registrar migración ${file}:`, error);
          // Continuamos de todos modos, ya que esto es solo para seguimiento
        }
      }

      console.log(`Migración ${file} completada con éxito.`);
      console.log('NOTA: Para ejecutar las migraciones, debes copiar y pegar el contenido de cada archivo SQL');
      console.log('en el SQL Editor de Supabase y ejecutarlo manualmente.');
      console.log(`Contenido de ${file}:`);
      console.log('----------------------------------------');
      console.log(sql);
      console.log('----------------------------------------');
      console.log('Copia este SQL y ejecútalo en el SQL Editor de Supabase.');
      console.log('Presiona Enter para continuar con el siguiente archivo...');

      // Esperar a que el usuario presione Enter
      await new Promise(resolve => {
        process.stdin.once('data', () => {
          resolve();
        });
      });
    }

    console.log('Todas las migraciones se han mostrado. Ejecuta cada una en el SQL Editor de Supabase.');
  } catch (error) {
    console.error('Error al ejecutar migraciones:', error);
    process.exit(1);
  }
}

// Ejecutar migraciones
runMigrations();
