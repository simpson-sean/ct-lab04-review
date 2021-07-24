import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import guitar_model from '../lib/models/guitar-model.js';


// CRUD
// C - create  POST   --> INSERT
// R - read    GET    --> SELECT
// U - update  PUT    --> UPDATE
// D - delete  DELETE --> DELETE

describe('guitar routes', () => {
  beforeEach(() => {
    return setup(pool);
  });


  it('creates a guitar', async () => {
      const guitar = { manufacturer: 'fender', strings: 6, is_electric: false };
      const res = await request(app).post('/api/v1/guitars').send(guitar);

      console.log(res.body);

      expect(res.body).toEqual({
          id: '1',
          ...guitar,
      });

      

      
  });

}); // <--- END PARENT CODE BLOCK