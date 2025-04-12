const request = require('supertest');
const app = require('../index');

describe('API Endpoints', () => {
  // Prueba de la ruta principal
  describe('GET /', () => {
    it('debería devolver un mensaje de bienvenida', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toEqual('Bienvenido a la API de E-commerce');
    });
  });

  // Prueba de ruta no existente
  describe('Ruta no existente', () => {
    it('debería devolver un error 404', async () => {
      const res = await request(app).get('/ruta-que-no-existe');
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message');
    });
  });

  // Aquí se pueden añadir más pruebas para otras rutas
});
