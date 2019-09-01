const express = require("express");
const routes = require("./routes");

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
  }

  routes() {
    // Access the routes of the app in a separate file
    this.server.use(routes);
  }
}

// Export the server
module.exports = new App().server;
