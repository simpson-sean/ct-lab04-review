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

    .get('/', async (req, res, next) => {
        try {
            const characters = await trek_model.getAllCharacters();

            res.send(characters);
        } catch (err) {
            next(err);
        }
    })

    .put('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, species, faction } = req.body;

            const updatedCharacter = await trek_model.updateById(id, { name, species, faction });

            res.send(updatedCharacter);

        } catch(err) {
            next(err);
        }
    })

    .delete('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const character = await trek_model.deleteById(id);

            res.send({
                message: `The character ${character.name} has been removed.`,
            });

        } catch (err) {
            next(err);
        }
    });