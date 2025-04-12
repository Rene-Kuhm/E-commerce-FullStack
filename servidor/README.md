# Backend para E-commerce

Este es un backend completo para una aplicación de e-commerce, desarrollado con Node.js, Express y Supabase.

## Características

- **Autenticación y autorización**

  - Registro de usuarios
  - Inicio de sesión
  - Gestión de roles (admin, cliente)
  - Recuperación de contraseña

- **Gestión de productos**

  - CRUD de productos
  - Categorías
  - Búsqueda y filtrado

- **Gestión de carrito de compras**

  - Añadir/eliminar productos
  - Actualizar cantidades
  - Guardar carrito para usuarios registrados

- **Gestión de pedidos**

  - Crear pedidos
  - Historial de pedidos
  - Estado de pedidos

- **Usuarios y perfiles**
  - Gestión de información personal
  - Direcciones de envío
  - Historial de compras

## Tecnologías utilizadas

- **Backend**: Node.js con Express
- **Base de datos**: PostgreSQL con Supabase
- **Autenticación**: JWT con Supabase Auth
- **Validación**: express-validator

## Requisitos previos

- Node.js (v14 o superior)
- Cuenta en Supabase

## Instalación

1. Clonar el repositorio:

   ```
   git clone <url-del-repositorio>
   cd nombre-del-repositorio
   ```

2. Instalar dependencias:

   ```
   npm install
   ```

3. Configurar variables de entorno:

   - Crea un archivo `.env` en la raíz del proyecto
   - Copia el contenido de `.env.example` y configura tus variables

4. Iniciar el servidor:
   ```
   npm run dev
   ```

## Estructura de la base de datos

### Tablas principales

- **users**: Información de usuarios
- **products**: Productos disponibles
- **categories**: Categorías de productos
- **carts**: Carritos de compra
- **cart_items**: Items en los carritos
- **orders**: Pedidos realizados
- **order_items**: Items en los pedidos
- **addresses**: Direcciones de los usuarios

## API Endpoints

### Autenticación

- `POST /api/auth/register`: Registrar un nuevo usuario
- `POST /api/auth/login`: Iniciar sesión
- `POST /api/auth/forgot-password`: Solicitar restablecimiento de contraseña
- `POST /api/auth/reset-password`: Restablecer contraseña
- `GET /api/auth/profile`: Obtener perfil del usuario actual
- `POST /api/auth/logout`: Cerrar sesión

### Productos

- `GET /api/products`: Obtener todos los productos
- `GET /api/products/featured`: Obtener productos destacados
- `GET /api/products/search`: Buscar productos
- `GET /api/products/:id`: Obtener un producto por ID
- `POST /api/products`: Crear un nuevo producto (admin)
- `PUT /api/products/:id`: Actualizar un producto (admin)
- `DELETE /api/products/:id`: Eliminar un producto (admin)

### Carrito

- `GET /api/cart`: Obtener el carrito del usuario
- `POST /api/cart/items`: Añadir un producto al carrito
- `PUT /api/cart/items/:item_id`: Actualizar cantidad de un item
- `DELETE /api/cart/items/:item_id`: Eliminar un item del carrito
- `DELETE /api/cart`: Vaciar el carrito

### Pedidos

- `GET /api/orders`: Obtener pedidos del usuario
- `GET /api/orders/stats`: Obtener estadísticas de pedidos
- `GET /api/orders/:id`: Obtener un pedido por ID
- `POST /api/orders`: Crear un nuevo pedido
- `PUT /api/orders/:id/status`: Actualizar estado de un pedido (admin)

### Usuarios

- `GET /api/users/profile`: Obtener perfil del usuario
- `PUT /api/users/profile`: Actualizar perfil del usuario
- `GET /api/users/addresses`: Obtener direcciones del usuario

## Configuración de Supabase

Para configurar Supabase:

1. Crea una cuenta en [Supabase](https://supabase.io)
2. Crea un nuevo proyecto
3. Configura las tablas necesarias (puedes usar las migraciones incluidas)
4. Configura las políticas de seguridad (RLS)
5. Obtén la URL y la API Key para configurar el archivo `.env`

## Desarrollo

Para ejecutar el servidor en modo desarrollo:

```
npm run dev
```

## Producción

### Preparación para producción

Antes de desplegar en producción, ejecuta:

```
npm run prepare-production
```

Este comando ejecutará las migraciones, pruebas y verificación de código.

### Ejecución en producción

#### Método 1: Node.js directo

```
npm start
```

#### Método 2: Usando PM2 (recomendado)

Primero, instala PM2 globalmente:

```
npm install -g pm2
```

Luego inicia la aplicación:

```
pm2 start ecosystem.config.js
```

#### Método 3: Docker

Construir la imagen:

```
docker build -t ecommerce-api .
```

Ejecutar el contenedor:

```
docker run -p 3000:3000 --env-file .env -d ecommerce-api
```

## Licencia

[MIT](LICENSE)
