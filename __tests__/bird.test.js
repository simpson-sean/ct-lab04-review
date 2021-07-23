import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import bird_model from '../lib/models/bird-model.js';

// CRUD
// C - create  POST   --> INSERT
// R - read    GET    --> SELECT
// U - update  PUT    --> UPDATE
// D - delete  DELETE --> DELETE

describe('bird routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a bird', async () => {
    const polly = { name: 'polly', breed: 'mccaw', age: 15 };
    const res = await request(app).post('/api/v1/birds').send(polly);

    expect(res.body).toEqual({
      id: '1',
      ...polly,

    });
  
  });


}) //<----END OF PARENT CODE BLOCK