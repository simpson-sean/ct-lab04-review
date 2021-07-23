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

    })

    .get('/', async (req, res, next) => {
        try {
            const birds = await bird_model.getAllBirds();

            res.send(birds);
        } catch (err) {
            next(err);
        }
    })

    .put('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, breed, age } = req.body;

            const updatedBird = await bird_model.updateById(id, { name, breed, age });

            res.send(updatedBird);

        } catch (err) {
            next(err);
        }
    
    })

    .delete('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const bird = await bird_model.deleteById(id);

            res.send({
                message: `The bird ${bird.name} was removed.`,
            });

        } catch (err) {
            next(err);
        }
    });


