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

      expect(res.body).toEqual({
          id: '1',
          ...guitar,
      });

      

      
  });

  it('gets a guitar by id', async () => {
    const guitar = await guitar_model.insert({
      manufacturer: 'fender',
      strings: 6,
      is_electric: false,
    });

    const res = await request(app).get(`/api/v1/guitars/${guitar.id}`);
    
    expect(res.body).toEqual(guitar);    
  })

  it('gets all guitars', async () => {
    const fender = await guitar_model.insert({
      manufacturer: 'fender',
      strings: 6,
      is_electric: false,

    })

    const ibanez = await guitar_model.insert({
      manufacturer: 'ibanez',
      strings: 12,
      is_electric: true,
    })

    const gibson = await guitar_model.insert({
      manufacturer: 'gibson',
      strings: 4,
      is_electric: true,

    })

    return request(app)
    .get('/api/v1/guitars')
    .then((res) => {
      expect(res.body).toEqual([ fender, ibanez, gibson ]);

    })
  })

  it('updates a guitar', async () => {
    const guitar = await guitar_model.insert({
      manufacturer: 'fender',
      strings: 6,
      is_electric: false, 

    })

    const res = await request(app)
      .put(`/api/v1/guitars/${guitar.id}`)
      .send({ is_electric: true });

      expect(res.body).toEqual({...guitar, is_electric: true });
    
  })
  

}); // <--- END PARENT CODE BLOCK