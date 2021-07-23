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
  
  //creates a bird via POST
  it('creates a bird', async () => {
    const polly = { name: 'polly', breed: 'mccaw', age: 15 };
    const res = await request(app).post('/api/v1/birds').send(polly);

    expect(res.body).toEqual({
      id: '1',
      ...polly,

    });
  
  });

  //gets a bird by ID with GET
  it('gets a bird', async () => {
    const jane = await bird_model.insert({
      name: 'jane',
      breed: 'cockatiel',
      age: 4,
    })

    const res = await request(app).get(`/api/v1/birds/${jane.id}`);

    expect(res.body).toEqual(jane);

  });




}) //<----END OF PARENT CODE BLOCK