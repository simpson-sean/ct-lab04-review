import { Router } from 'express';
import Bird from '../models/bird-model.js';

export default Router()
    .post('/', async (req, res, next) => {
        try {
            const bird = await Bird.insert(req.body);

            res.send(bird);

        } catch(err) {
            next(err)
;        }
    })