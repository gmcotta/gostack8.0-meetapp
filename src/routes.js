// Import only the Router module of Express
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import OrganizerController from './app/controllers/OrganizerController';
import SubscriberController from './app/controllers/SubscriberController';
import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';

// Instanciate the Router module
const routes = new Router();

// Instanciate a multer object
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
routes.post('/files', upload.single('file'), FileController.store);

// List all meetups
routes.get('/meetups', MeetupController.index);
// Create a meetup
routes.post('/meetups', MeetupController.store);
// Update a meetup
routes.put('/meetups/:meetupId', MeetupController.update);
// Delete a meetup
routes.delete('/meetups/:meetupId', MeetupController.delete);

// List meetups that were created by the logged user
routes.get('/organizer', OrganizerController.index);
// List subscription notifications from the meetups of the logged user
routes.get('/notifications', NotificationController.index);

// List meetups that were subscribed by the logged user
routes.get('/subscription', SubscriberController.index);
// Create a subscription of the meetup
routes.post('/subscription/:meetupId', SubscriberController.store);

// Export the route
export default routes;
