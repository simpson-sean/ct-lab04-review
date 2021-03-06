import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import birdsController  from './controllers/birds.js';
import carsController from './controllers/cars.js';
import treksController from './controllers/treks.js';
import guitarsController from './controllers/guitars.js';
import produceController from './controllers/produce.js';

const app = express();

app.use(express.json());

app.use('/api/v1/birds', birdsController);
app.use('/api/v1/cars', carsController);
app.use('/api/v1/treks', treksController);
app.use('/api/v1/guitars', guitarsController);
app.use('/api/v1/produce', produceController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
