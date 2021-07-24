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
    });