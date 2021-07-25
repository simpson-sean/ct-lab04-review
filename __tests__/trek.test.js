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
      const character = { name: 'picard', species: 'human', faction: 'starfleet'}
      const res = await request(app).post('/api/v1/treks').send(character);

      expect(res.body).toEqual({
          id: '1',
          ...character,
      
        });
  });

  it('gets a character by id', async () => {
    const character = await trek_model.insert({
      name: 'picard',
      species: 'human',
      faction: 'starfleet',

    });

    const res = await request(app).get(`/api/v1/treks/${character.id}`);

    expect(res.body).toEqual(character);
  })

  it('gets all characters', async () => {
    const picard = await trek_model.insert({
      name:'picard',
      species: 'human',
      faction: 'starfeleet',

    })

    const worf = await trek_model.insert({
      name: 'worf',
      species: 'klingon',
      faction: 'starfleet',

    })

    const spock = await trek_model.insert({
      name: 'spock',
      species: 'vulcan',
      faction: 'starfleet',
    })

    return request(app)
      .get('/api/v1/treks')
      .then((res) => {
        expect(res.body).toEqual([picard, worf, spock]);

      })
  })

  it('updates a character', async () => {
    const worf = await trek_model.insert({
      name: 'worf',
      species: 'klingon',
      faction: 'starfleet',

    })

    const res = await request(app)
      .put(`/api/v1/treks/${worf.id}`)
      .send({ faction: 'klingon empire'});

      expect(res.body).toEqual({...worf, faction: 'klingon empire'});

  })

  it('deletes a character', async () => {
    const character = await trek_model.insert({
      name: 'picard',
      species: 'human',
      faction: 'starfleet',
    });

    const res = await request(app)
      .delete(`/api/v1/treks/${character.id}`);
    
    expect(res.body).toEqual({
      message: `The character ${character.name} has been removed.`
    });


  })

}); // <---- END PARENT CODE BLOCK