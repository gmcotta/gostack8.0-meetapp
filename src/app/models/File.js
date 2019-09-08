import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      // First argument is the columns of the table
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      // Second argument is the configuration
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;
