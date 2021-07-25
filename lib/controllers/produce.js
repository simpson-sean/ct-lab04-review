import { Router } from 'express';
import Produce from '../models/produce-model.js';
import produce_model from '../models/produce-model.js'

export default Router()
    .post('/', async (req, res, next) => {
        try {
            const apple = await Produce.insert(req.body);

            res.send(apple);

            } catch (err) {
                next(err);
            }
    })

    .get('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const apple = await produce_model.getProduceById(id);

            res.send(apple);
        
        } catch(err) {
            next(err);
        }
    })

    .get('/', async (req, res, next) => {
        try {
            const allProduce = await produce_model.getAllProduce();

            res.send(allProduce);

        } catch (err) {
            next(err);
        }
    })

    .put('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, type, in_season } = req.body;
            
            const updatedProduce = await produce_model.updateProduceById(id, {name, type, in_season});

            res.send(updatedProduce);

        } catch (err) {
            next(err);
        }
    })

    
    .delete('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const produce = await produce_model.deleteProduceById(id);

            res.send({
                message: `The ${produce.name} apple has been removed.`,
            });
        } catch(err) {
            next(err);
        }
    });
