require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Directorio de migraciones
const migrationsDir = path.join(__dirname, 'migrations');
const outputDir = path.join(__dirname, 'output');

// Crear directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Función para generar scripts SQL
function generateMigrationScripts() {
  try {
    console.log('Generando scripts de migración...');

    // Leer archivos de migración
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort(); // Ordenar por nombre para ejecutar en secuencia

    // Procesar cada archivo de migración
    for (const file of migrationFiles) {
      console.log(`Procesando: ${file}`);
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');

      // Crear archivo de salida
      const outputPath = path.join(outputDir, file);
      fs.writeFileSync(outputPath, sql);

      console.log(`Script generado: ${outputPath}`);
    }

    console.log('\nTodos los scripts han sido generados en el directorio "src/database/output".');
    console.log('Para ejecutar las migraciones:');
    console.log('1. Inicia sesión en tu proyecto de Supabase: https://app.supabase.com/');
    console.log('2. Ve a la sección "SQL Editor"');
    console.log('3. Copia y pega el contenido de cada archivo SQL en el editor');
    console.log('4. Ejecuta los scripts en orden (01_create_tables.sql, 02_create_rls_policies.sql, etc.)');
  } catch (error) {
    console.error('Error al generar scripts:', error);
    process.exit(1);
  }
}

// Generar scripts
generateMigrationScripts();
