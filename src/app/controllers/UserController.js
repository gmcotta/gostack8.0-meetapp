import User from '../models/User';

class UserController {
  // Create method
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

  // Update method
  async update(req, res) {
    console.log(req.userId);
    return res.json({ ok: true });
  }
}

export default new UserController();
