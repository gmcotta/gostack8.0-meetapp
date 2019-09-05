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
    // Get the email and old password from the request body
    const { email, oldPassword } = req.body;

    // Find the user by the primary key using the id of the authenticated user
    const user = await User.findByPk(req.userId);

    // Check if the email is changing
    if (email !== user.email) {
      // Verify if the user email already exists
      const userExists = await User.findOne({ where: { email } });
      // If the user exists, return a 400 status and an error message
      if (userExists) {
        return res.status(400).json({ error: 'Email already exists.' });
      }
    }

    // Check if the password is changing
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({ id, name, email });
  }
}

export default new UserController();
