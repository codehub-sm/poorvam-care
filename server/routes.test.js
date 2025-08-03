const request = require('supertest');
const { registerRoutes } = require('./routes');
const { storage } = require('./storage');
const express = require('express');

let app;
let server;

beforeAll(async () => {
  app = express();
  app.use(express.json());
  server = await registerRoutes(app);
  server.listen(0);
});

afterAll((done) => {
  server.close(done);
});

describe('Auth Middleware', () => {
  it('should return 401 for protected routes without a token', async () => {
    const response = await request(app).get('/api/admin/contacts');
    expect(response.status).toBe(401);
  });
});
