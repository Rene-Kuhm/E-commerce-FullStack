-- Habilitar Row Level Security (RLS) en todas las tablas
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Políticas para categorías
-- Cualquiera puede ver las categorías
CREATE POLICY "Cualquiera puede ver categorías" ON categories
  FOR SELECT USING (true);

-- Solo administradores pueden modificar categorías
CREATE POLICY "Solo administradores pueden insertar categorías" ON categories
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

CREATE POLICY "Solo administradores pueden actualizar categorías" ON categories
  FOR UPDATE USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

CREATE POLICY "Solo administradores pueden eliminar categorías" ON categories
  FOR DELETE USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

-- Políticas para productos
-- Cualquiera puede ver productos
CREATE POLICY "Cualquiera puede ver productos" ON products
  FOR SELECT USING (true);

-- Solo administradores pueden modificar productos
CREATE POLICY "Solo administradores pueden insertar productos" ON products
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

CREATE POLICY "Solo administradores pueden actualizar productos" ON products
  FOR UPDATE USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

CREATE POLICY "Solo administradores pueden eliminar productos" ON products
  FOR DELETE USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

-- Políticas para usuarios
-- Los usuarios solo pueden ver y modificar su propio perfil
CREATE POLICY "Los usuarios pueden ver su propio perfil" ON users
  FOR SELECT USING (
    auth.uid() = id OR 
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

CREATE POLICY "Los usuarios pueden actualizar su propio perfil" ON users
  FOR UPDATE USING (
    auth.uid() = id OR 
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

-- Políticas para direcciones
-- Los usuarios solo pueden ver y modificar sus propias direcciones
CREATE POLICY "Los usuarios pueden ver sus propias direcciones" ON addresses
  FOR SELECT USING (
    auth.uid() = user_id OR 
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

CREATE POLICY "Los usuarios pueden insertar sus propias direcciones" ON addresses
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
  );

CREATE POLICY "Los usuarios pueden actualizar sus propias direcciones" ON addresses
  FOR UPDATE USING (
    auth.uid() = user_id
  );

CREATE POLICY "Los usuarios pueden eliminar sus propias direcciones" ON addresses
  FOR DELETE USING (
    auth.uid() = user_id
  );

-- Políticas para carritos
-- Los usuarios solo pueden ver y modificar su propio carrito
CREATE POLICY "Los usuarios pueden ver su propio carrito" ON carts
  FOR SELECT USING (
    auth.uid() = user_id
  );

CREATE POLICY "Los usuarios pueden insertar su propio carrito" ON carts
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
  );

CREATE POLICY "Los usuarios pueden actualizar su propio carrito" ON carts
  FOR UPDATE USING (
    auth.uid() = user_id
  );

CREATE POLICY "Los usuarios pueden eliminar su propio carrito" ON carts
  FOR DELETE USING (
    auth.uid() = user_id
  );

-- Políticas para items del carrito
-- Los usuarios solo pueden ver y modificar los items de su propio carrito
CREATE POLICY "Los usuarios pueden ver items de su propio carrito" ON cart_items
  FOR SELECT USING (
    cart_id IN (SELECT id FROM carts WHERE user_id = auth.uid())
  );

CREATE POLICY "Los usuarios pueden insertar items en su propio carrito" ON cart_items
  FOR INSERT WITH CHECK (
    cart_id IN (SELECT id FROM carts WHERE user_id = auth.uid())
  );

CREATE POLICY "Los usuarios pueden actualizar items de su propio carrito" ON cart_items
  FOR UPDATE USING (
    cart_id IN (SELECT id FROM carts WHERE user_id = auth.uid())
  );

CREATE POLICY "Los usuarios pueden eliminar items de su propio carrito" ON cart_items
  FOR DELETE USING (
    cart_id IN (SELECT id FROM carts WHERE user_id = auth.uid())
  );

-- Políticas para órdenes
-- Los usuarios pueden ver sus propias órdenes, los administradores pueden ver todas
CREATE POLICY "Los usuarios pueden ver sus propias órdenes" ON orders
  FOR SELECT USING (
    auth.uid() = user_id OR 
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

CREATE POLICY "Los usuarios pueden crear sus propias órdenes" ON orders
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
  );

CREATE POLICY "Solo administradores pueden actualizar órdenes" ON orders
  FOR UPDATE USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

-- Políticas para items de órdenes
-- Los usuarios pueden ver los items de sus propias órdenes
CREATE POLICY "Los usuarios pueden ver items de sus propias órdenes" ON order_items
  FOR SELECT USING (
    order_id IN (SELECT id FROM orders WHERE user_id = auth.uid()) OR
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );

CREATE POLICY "Los usuarios pueden insertar items en sus propias órdenes" ON order_items
  FOR INSERT WITH CHECK (
    order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
  );

-- Solo administradores pueden actualizar items de órdenes
CREATE POLICY "Solo administradores pueden actualizar items de órdenes" ON order_items
  FOR UPDATE USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );
