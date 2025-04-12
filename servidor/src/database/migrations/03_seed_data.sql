-- Insertar categorías de ejemplo
INSERT INTO categories (name, description, image_url) VALUES
('Electrónica', 'Productos electrónicos y gadgets', 'https://example.com/images/electronics.jpg'),
('Ropa', 'Ropa y accesorios de moda', 'https://example.com/images/clothing.jpg'),
('Hogar', 'Artículos para el hogar y decoración', 'https://example.com/images/home.jpg'),
('Deportes', 'Equipamiento deportivo y accesorios', 'https://example.com/images/sports.jpg'),
('Libros', 'Libros, e-books y audiolibros', 'https://example.com/images/books.jpg');

-- Insertar productos de ejemplo
INSERT INTO products (name, description, price, stock, category_id, image_url, is_featured, sku) VALUES
-- Electrónica
('Smartphone XYZ', 'Smartphone de última generación con cámara de alta resolución', 599.99, 50, 
 (SELECT id FROM categories WHERE name = 'Electrónica'), 
 'https://example.com/images/smartphone.jpg', true, 'ELEC-001'),

('Laptop Pro', 'Laptop potente para trabajo y gaming', 1299.99, 25, 
 (SELECT id FROM categories WHERE name = 'Electrónica'), 
 'https://example.com/images/laptop.jpg', true, 'ELEC-002'),

('Auriculares Bluetooth', 'Auriculares inalámbricos con cancelación de ruido', 149.99, 100, 
 (SELECT id FROM categories WHERE name = 'Electrónica'), 
 'https://example.com/images/headphones.jpg', false, 'ELEC-003'),

-- Ropa
('Camiseta Premium', 'Camiseta de algodón 100% de alta calidad', 29.99, 200, 
 (SELECT id FROM categories WHERE name = 'Ropa'), 
 'https://example.com/images/tshirt.jpg', false, 'CLOTH-001'),

('Jeans Clásicos', 'Jeans duraderos y cómodos para uso diario', 59.99, 150, 
 (SELECT id FROM categories WHERE name = 'Ropa'), 
 'https://example.com/images/jeans.jpg', true, 'CLOTH-002'),

-- Hogar
('Juego de Sábanas', 'Juego de sábanas de algodón egipcio', 89.99, 75, 
 (SELECT id FROM categories WHERE name = 'Hogar'), 
 'https://example.com/images/sheets.jpg', false, 'HOME-001'),

('Lámpara de Mesa', 'Lámpara elegante para mesa de noche o escritorio', 49.99, 60, 
 (SELECT id FROM categories WHERE name = 'Hogar'), 
 'https://example.com/images/lamp.jpg', true, 'HOME-002'),

-- Deportes
('Balón de Fútbol', 'Balón de fútbol profesional', 39.99, 120, 
 (SELECT id FROM categories WHERE name = 'Deportes'), 
 'https://example.com/images/football.jpg', false, 'SPORT-001'),

('Raqueta de Tenis', 'Raqueta de tenis para jugadores intermedios', 129.99, 40, 
 (SELECT id FROM categories WHERE name = 'Deportes'), 
 'https://example.com/images/tennis.jpg', true, 'SPORT-002'),

-- Libros
('El Arte de la Guerra', 'Clásico de estrategia militar de Sun Tzu', 19.99, 200, 
 (SELECT id FROM categories WHERE name = 'Libros'), 
 'https://example.com/images/artofwar.jpg', false, 'BOOK-001'),

('Cien Años de Soledad', 'Obra maestra de Gabriel García Márquez', 24.99, 180, 
 (SELECT id FROM categories WHERE name = 'Libros'), 
 'https://example.com/images/solitude.jpg', true, 'BOOK-002');
