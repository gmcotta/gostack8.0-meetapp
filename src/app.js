import express from 'express';
import path from 'path';
import routes from './routes';

import './database';

// Main class
class App {
  constructor() {
    // Initialize the server
    this.server = express();

    // Initialize the middleware and route methods
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Receive requests in JSON format
    this.server.use(express.json());
    // Set the route and path to user static files
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    // Access the routes of the app in a separate file
    this.server.use(routes);
  }
}

// Export the server
export default new App().server;
