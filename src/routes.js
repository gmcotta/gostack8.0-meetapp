// Import only the Router module of Express
import { Router } from 'express';

// Instanciate the Router module
const routes = new Router();

// Create a route only for test the app
routes.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Export the route
export default routes;
