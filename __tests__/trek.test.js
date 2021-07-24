import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import trek_model from '../lib/models/trek-model.js';


// CRUD
// C - create  POST   --> INSERT
// R - read    GET    --> SELECT
// U - update  PUT    --> UPDATE
// D - delete  DELETE --> DELETE

describe('trek routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a character', async () => {
      const picard = { name: 'picard', species: 'human', faction: 'starfleet'}
      const res = await request(app).post('/api/v1/treks').send(picard);

      expect(res.body).toEqual({
          id: '1',
          ...picard,
      
        });
  });

}); // <---- END PARENT CODE BLOCK