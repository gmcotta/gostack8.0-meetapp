import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  // Create method
  async store(req, res) {
    // Create a schema for validating the request
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    // Validate the data received from the body of the request with the schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    // Retrieve the name and email from the body of the request
    const { email, password } = req.body;
    // Check if the email exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'User does not exist' });
    }
    // Check if the password is correct
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password is incorrect' });
    }
    // Destructuring the user object to obtain just the user id and name
    const { id, name } = user;

    // Return the relevant values of the user and the token
    return res.json({
      user: {
        id,
        name,
        email,
      },
      // First argument is the payload, the second one is a secret word, and
      // the third one is the expiry date
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
