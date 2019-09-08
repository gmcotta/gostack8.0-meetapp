import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
  // Initialize the model by inherit the Model method from Sequelize
  static init(sequelize) {
    // First argument is the columns of the model
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        location: Sequelize.STRING,
        date: Sequelize.DATE,
      },
      // Second argument is the configuration
      {
        sequelize,
      }
    );

    return this;
  }

  /*
   * Associate this model to the File and User models using banner_id and user_id
   * as foreign key, respectively
   */
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'banner_id', as: 'banner' });
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

export default Meetup;
