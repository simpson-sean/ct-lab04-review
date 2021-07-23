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
  }); // <---END CREATE BIRD

  //gets a bird by ID with GET
  it('gets a bird', async () => {
    const jane = await bird_model.insert({
      name: 'jane',
      breed: 'cockatiel',
      age: 4,
    })

    const res = await request(app).get(`/api/v1/birds/${jane.id}`);

    expect(res.body).toEqual(jane);

  }); // <--- END GET BIRD BY ID

  // gets all birds via GET
  it('gets all birds', async () => {
    const polly = await bird_model.insert({
      name: 'polly',
      breed: 'mccaw',
      age: 15,  
    });

    const jane = await bird_model.insert({
      name: 'jane',
      breed: 'cockatiel',
      age: 4
    });

    const joe = await bird_model.insert({
      name: 'joe',
      breed: 'osprey',
      age: 8,
    });

    return request(app)
      .get('/api/v1/birds')
      .then((res) => {
        expect(res.body).toEqual([polly, jane, joe]);
    });
  
  }); // <---END OF GET ALL BIRDS BLOCK

  //updates a bird record via PUT
  it('updates a bird', async () => {
    const polly = await bird_model.insert({
      name: 'polly',
      breed: 'mccaw',
      age: 15,

    });

    const res = await request(app)
      .put(`/api/v1/birds/${polly.id}`)
      .send({ age: 16 });

    expect(res.body).toEqual({...polly, age: 16});
  
  });

  //deletes a bird via DELETE
  it('deletes a bird', async () => {
    const bird = await bird_model.insert({
      name: 'polly',
      breed: 'mccaw',
      age: 15,
    });

    const res = await request(app).delete(`/api/v1/birds/${bird.id}`);

    expect(res.body).toEqual({
      message: `The bird ${bird.name} was removed.`
    });

  })




}) //<----END OF PARENT CODE BLOCK