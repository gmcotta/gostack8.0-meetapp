import jwt from 'jsonwebtoken';
import User from '../models/User';

class SessionController {
  async store(req, res) {
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
      token: jwt.sign({ id }, 'c6766fcec7f55818f603c8a0d6327113', {
        expiresIn: '7d',
      }),
    });
  }
}

export default new SessionController();
