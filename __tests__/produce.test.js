import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import produce_model from '../lib/models/produce-model.js';


// CRUD
// C - create  POST   --> INSERT
// R - read    GET    --> SELECT
// U - update  PUT    --> UPDATE
// D - delete  DELETE --> DELETE

describe('produce routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates produce', async () => {
      const apple = { name: 'granny smith', type:'fruit', in_season: true };
      const res = await request(app).post('/api/v1/produce').send(apple);

      expect(res.body).toEqual({
          id: '1',
          ...apple,
      })
  })





}); // <--- END PARENT CODE BLOCK