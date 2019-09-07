// Import only the Router module of Express
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

// Instanciate the Router module
const routes = new Router();

const upload = multer(multerConfig);

// Create an user
routes.post('/users', UserController.store);
// Create a session
routes.post('/sessions', SessionController.store);

// Authentication middleware
routes.use(authMiddleware);
// Update an user
routes.put('/users', UserController.update);
// Create a file
/* Add a middleware to upload a single file, which is contained in the 'file'
 * field of the multipart form
 */
routes.post('/files', upload.single('file'), (req, res) => {
  res.json({ ok: 'File added' });
});

// Export the route
export default routes;
