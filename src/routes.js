// Import only the Router module of Express
import { Router } from 'express';

import User from './app/models/User';

// Instanciate the Router module
const routes = new Router();

// Create a route only for test the app
routes.get('/', async (req, res) => {
  // Create an user for testing purpose
  const user = await User.create({
    name: 'Gustavo Cotta',
    email: 'gmcotta34@gmail.com',
    password_hash: '123456',
  });

  return res.json(user);
});

// Export the route
export default routes;
