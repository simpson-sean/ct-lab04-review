import { Router } from 'express';
import bird_model from '../models/bird-model.js';
import Bird from '../models/bird-model.js';

export default Router()
    .post('/', async (req, res, next) => {
        try {
            const bird = await Bird.insert(req.body);

            res.send(bird);
         } 
         catch(err) {
           next(err);        
        }
    })

    .get('/:id', async (req, res, next) => {
        try{
            const { id } = req.params;
            const bird = await bird_model.getById(id);

            res.send(bird);
        } catch (err) {
            next(err);
        }

    });