import request from 'supertest';
import { Express } from 'express';
import { registerRoutes } from './routes';
import { Server } from 'http';

let app: Express;
let server: Server;

beforeAll(async () => {
  const express = require('express');
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
