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

    .get('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const guitar = await guitar_model.getById(id);

            res.send(guitar);

        } catch (err) {
            next(err);
        }
    })

    .get('/', async (req, res, next) => {
        try {
            const guitars = await guitar_model.getAllGuitars();

            res.send(guitars);
        } catch (err) {
            next(err);
        }
    })

    .put('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const { manufacturer, strings, is_electric } = req.body;

            const updatedGuitar = await guitar_model.updateGuitarById(id, {manufacturer, strings, is_electric });

            res.send(updatedGuitar);
        
        } catch(err) {
            next(err);
        }
    })