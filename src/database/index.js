import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';

// Create an array containing all the app models
const models = [User, File];

class Database {
  constructor() {
    this.init();
  }

  // This method will connect to the database and load the models
  init() {
    // Establish the connection to the database
    this.connection = new Sequelize(databaseConfig);

    // For each model of the app, initialize it through the connection made earlier
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
