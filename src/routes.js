// Import only the Router module of Express
import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

// Instanciate the Router module
const routes = new Router();

// Transform the route created earlier into a method imported from the controller
routes.post('/users', UserController.store);
// Create a session
routes.post('/sessions', SessionController.store);

// Export the route
export default routes;
