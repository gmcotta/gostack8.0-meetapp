import multer from 'multer';
import crypto from 'crypto';
import { resolve, extname } from 'path';

export default {
  // Storage the file in an internal upload folder
  storage: multer.diskStorage({
    // Set the path of the folder
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // Generate an unique hexadecimal string and the original file extension
    filename: (req, file, cb) => {
      // Generate 16 random bytes
      crypto.randomBytes(16, (err, res) => {
        // Return an error if something is wrong
        if (err) return cb(err);
        /* Return a hexadecimal string based on the bytes and concatenate with
         * the extension of the original file
         */
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
