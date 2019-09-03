import User from '../models/User';

class UserController {
  async store(req, res) {
    // Verify if the user email already exists
    const userExists = await User.findOne({ where: { email: req.body.email } });
    // If the user exists, return a 400 status and an error message
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    // Else, create an user
    const { id, name, email } = await User.create(req.body);

    // Return the user created as a response
    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
