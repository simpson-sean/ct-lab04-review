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
