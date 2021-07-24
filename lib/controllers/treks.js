import { Router } from 'express';
import Trek from "../models/trek-model.js";
import trek_model from '../models/trek-model.js';

export default Router()
    .post('/', async (req, res, next) => {
        try {
            const trek = await Trek.insert(req.body);

            res.send(trek);
        } catch (err) {
            next(err);
        }
    })

    .get('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const character = await trek_model.getById(id);

            res.send(character);
        } catch (err) {
            next(err);
        }
    })