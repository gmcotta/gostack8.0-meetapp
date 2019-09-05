// Import only the Router module of Express
import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

// Instanciate the Router module
const routes = new Router();

// Create an user
routes.post('/users', UserController.store);
// Create a session
routes.post('/sessions', SessionController.store);

// Authentication middleware
routes.use(authMiddleware);
// Update an user
routes.put('/users', UserController.update);

// Export the route
export default routes;
