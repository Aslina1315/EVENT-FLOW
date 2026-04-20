/**
 * server.test.js
 * Basic smoke tests for the EventFlow Express API.
 *
 * Run with:  npm test  (from the /server directory)
 * Requires:  npm install --save-dev jest supertest
 *
 * These tests validate API contract shapes WITHOUT modifying any data
 * (read-only GET requests and a safe POST to /api/chat).
 */

const request = require('supertest');
const app = require('./server'); // server exports the Express `app`

// -----------------------------------------------------------------------
// Health Check
// -----------------------------------------------------------------------
describe('GET /api/health', () => {
  it('should return status ok and a numeric uptime', async () => {
    const response = await request(app).get('/api/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(typeof response.body.uptime).toBe('number');
  });
});

// -----------------------------------------------------------------------
// Events Endpoint
// -----------------------------------------------------------------------
describe('GET /api/events', () => {
  it('should return an array of events', async () => {
    const response = await request(app).get('/api/events');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('each event should have required fields', async () => {
    const response = await request(app).get('/api/events');
    // Only run field checks if the database returned at least one event
    if (response.body.length > 0) {
      const event = response.body[0];
      expect(event).toHaveProperty('title');
      expect(event).toHaveProperty('date');
      expect(event).toHaveProperty('location');
      expect(event).toHaveProperty('type');
      expect(event).toHaveProperty('price');
    }
  });
});

// -----------------------------------------------------------------------
// Auth Endpoint – Registration Validation
// -----------------------------------------------------------------------
describe('POST /api/auth/register', () => {
  it('should return 400 when required fields are missing', async () => {
    // Send only email, omit name and password
    const response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'incomplete@test.com' });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});

// -----------------------------------------------------------------------
// Auth Endpoint – Login Validation
// -----------------------------------------------------------------------
describe('POST /api/auth/login', () => {
  it('should return 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nobody@notreal.com', password: 'wrongpassword' });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
  });
});

// -----------------------------------------------------------------------
// Chat (AI Concierge) Endpoint
// -----------------------------------------------------------------------
describe('POST /api/chat', () => {
  it('should return a reply string for an event-related query', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({ message: 'What events are happening?' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('reply');
    expect(typeof response.body.reply).toBe('string');
    expect(response.body.reply.length).toBeGreaterThan(0);
  });

  it('should return a reply string for a crowd-safety query', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({ message: 'Is the crowd safe near the main stage?' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('reply');
  });
});

// -----------------------------------------------------------------------
// Zones Endpoint
// -----------------------------------------------------------------------
describe('GET /api/zones', () => {
  it('should return an array of crowd zones', async () => {
    const response = await request(app).get('/api/zones');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

// -----------------------------------------------------------------------
// Alerts Endpoint
// -----------------------------------------------------------------------
describe('GET /api/alerts', () => {
  it('should return an array of alerts', async () => {
    const response = await request(app).get('/api/alerts');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
