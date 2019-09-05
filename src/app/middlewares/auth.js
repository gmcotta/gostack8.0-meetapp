import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // Retrieve the token from the request header
  const authHeader = req.headers.authorization;
  // If the token does not exist, return a 401 status with an error message
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }
  // Remove the 'Bearer' word from the token
  const [, token] = authHeader.split(' ');

  // Decode the token to get the payload (in this case, the user id)
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // Add the user id to the request
    req.userId = decoded.id;
    // Return to the requested route
    return next();

    // If there is an error while decoding the token, return a 401 status with an
    // error message
  } catch (err) {
    return res.status(401).json({ error: 'Token is invalid' });
  }
};
