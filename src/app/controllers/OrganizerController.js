import Meetup from '../models/Meetup';
import File from '../models/File';

class OrganizerController {
  // List all meetups created by the organizer
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: {
        user_id: req.userId,
      },
      // Set some of the attributes from the Meetup model
      attributes: ['id', 'title', 'description', 'location', 'date'],
      // Include some attributes from the File model
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'url', 'name', 'path'],
        },
      ],
    });
    return res.json(meetups);
  }
}

export default new OrganizerController();
