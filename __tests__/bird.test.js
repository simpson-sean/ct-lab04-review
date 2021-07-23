import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

// CRUD
// C - create  POST   --> INSERT
// R - read    GET    --> SELECT
// U - update  PUT    --> UPDATE
// D - delete  DELETE --> DELETE

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  
});
