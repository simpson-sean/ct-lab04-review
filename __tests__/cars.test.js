import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import car_model from '../lib/models/car-model.js';


// CRUD
// C - create  POST   --> INSERT
// R - read    GET    --> SELECT
// U - update  PUT    --> UPDATE
// D - delete  DELETE --> DELETE

describe('car routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a car', async () => {
      const subaru = { make: 'subaru', model: 'forestor', man_year: 2015, color: 'red' }
      const res = await request(app).post('/api/v1/cars').send(subaru);
      
      expect(res.body).toEqual({
          id: '1',
          ...subaru,
      });
  })

  it('gets a single car by id', async () => {
      const subaru = await car_model.insert({
          make: 'subaru',
          model: 'forestor',
          man_year: 2015,
          color: 'red',
      });
          const res = await request(app).get(`/api/v1/cars/${subaru.id}`);

          expect(res.body).toEqual(subaru);
      });
  

    it('gets all cars', async () => {
        const subaru = await car_model.insert({
            make: 'subaru',
            model: 'forestor',
            man_year: 2015,
            color: 'red',
        });

        const audi = await car_model.insert({
            make: 'audi',
            model: 'quadro',
            man_year: 2020,
            color: 'slate',
        });

        const volkswagen = await car_model.insert({
            make: 'volkswagen',
            model: 'tiguan',
            man_year: '2019',
            color: 'sea foam',
        });

        return request(app)
            .get('/api/v1/cars')
            .then((res) => {
                expect(res.body).toEqual([subaru, audi, volkswagen]);
            });
    })
}); // <---- END PARENT CODE BLOCK

