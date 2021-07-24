import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import birdsController  from './controllers/birds.js';
import carsController from './controllers/cars.js';
import treksController from './controllers/treks.js';

const app = express();

app.use(express.json());

app.use('/api/v1/birds', birdsController);
app.use('/api/v1/cars', carsController);
app.use('/api/v1/treks', treksController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
