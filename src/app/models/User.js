import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      // First argument is the columns of the model
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
      },
      // Second argument is the configuration
      {
        sequelize,
      }
    );
  }
}

export default User;
