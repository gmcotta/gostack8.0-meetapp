import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      // First argument is the columns of the model
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        // this field is used only for this model, it won't exist on the database
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      // Second argument is the configuration
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
  }
}

export default User;
