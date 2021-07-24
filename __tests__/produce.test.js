import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import produce_model from '../lib/models/produce-model.js';
import produce from '../lib/controllers/produce.js';


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
  });

  it('gets produce by id', async () => {
      const apple = await produce_model.insert({
          name: 'granny smith',
          type: 'fruit',
          in_season: true,
      });

      const res = await request(app).get(`/api/v1/produce/${apple.id}`);

      expect(res.body).toEqual(apple);
  });

  it('gets all produce', async () => {
      const apple = await produce_model.insert({
          name: 'granny smith',
          type: 'fruit',
          in_season: true,
      })

      const cherry = await produce_model.insert({
          name: 'ranier cherry',
          type: 'fruit',
          in_season: false,
      })

      const pepper = await produce_model.insert({
          name: 'red pepper',
          type: 'vegetable',
          in_season: true,
      })

      return request(app)
       .get('/api/v1/produce')
       .then((res) => {
           expect(res.body).toEqual([ apple, cherry, pepper ]);
       })
  })




}); // <--- END PARENT CODE BLOCK