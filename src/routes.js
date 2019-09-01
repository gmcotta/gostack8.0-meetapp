// Import only the Router module of Express
const { Router } = require("express");

// Instanciate the Router module
const routes = new Router();

// Create a route only for test the app
routes.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// Export the route
module.exports = routes;
