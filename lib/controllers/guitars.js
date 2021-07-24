import { Router } from 'express';
import Guitar from '../models/guitar-model.js';
import guitar_model from '../models/guitar-model.js';

export default Router()
    .post('/', async (req, res, next) => {
        try {
            const guitar = await Guitar.insert(req.body);

            res.send(guitar);
        
        } catch (err) {
            next(err);
        }
    })