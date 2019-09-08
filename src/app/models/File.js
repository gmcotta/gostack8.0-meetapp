import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      // First argument is the columns of the table
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        // this field is used only for this model, it won't exist on the database
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3333/files/${this.path}`;
          },
        },
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
