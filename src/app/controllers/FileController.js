import File from '../models/File';

class FileController {
  // Method create
  async store(req, res) {
    // Retrieve the filename and original name from the file field of the request
    const { filename: path, originalname: name } = req.file;

    // Create a row in the table with the path and name
    const file = await File.create({ path, name });

    // Return the data informed ealier as a response
    return res.json(file);
  }
}

export default new FileController();
