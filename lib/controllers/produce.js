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
