import { Router } from 'express';
import car_model from '../models/car-model.js';
import Car from "../models/car-model.js";

export default Router()
    .post('/', async (req, res, next) => {
        try {
            const car = await Car.insert(req.body);

            res.send(car);
        } 
        catch (err) {
          next(err);
        }
    })

    .get('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const car = await car_model.getById(id);

            res.send(car);
        } catch (err) {
            next(err);
        }

    })

    .get('/', async (req, res, next) => {
        try {
            const cars = await car_model.getAllCars();

            res.send(cars);   
        } catch (err) {
            next(err);
        }
    })