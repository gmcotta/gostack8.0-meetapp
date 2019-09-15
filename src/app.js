import express from 'express';
import 'express-async-errors';

import path from 'path';

import Youch from 'youch';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';

import routes from './routes';

import './database';

// Main class
class App {
  constructor() {
    // Initialize the server
    this.server = express();

    // Initialize Sentry
    Sentry.init(sentryConfig);

    // Sentry will handle requests
    this.server.use(Sentry.Handlers.requestHandler());
    // Initialize the middleware and route methods
    this.middlewares();
    this.routes();

    // Sentry will handle errors
    this.server.use(Sentry.Handlers.errorHandler());

    // App will send an error respons in case of any error
    this.exceptionHandler();
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

  // Middleware to send error response
  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      // Convert the obtained errors to JSON
      const errors = await new Youch(err, req).toJSON();
      return res.status(500).json(errors);
    });
  }
}

// Export the server
export default new App().server;
