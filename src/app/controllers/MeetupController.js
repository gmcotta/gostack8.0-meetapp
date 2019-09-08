import * as Yup from 'yup';

import File from '../models/File';
import Meetup from '../models/Meetup';

class MeetupController {
  // List all meetups created by the logged user
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['id', 'title', 'description', 'location', 'date'],
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

  async store(req, res) {
    // Create a schema for validating the request
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      banner_id: Yup.number().required(),
    });

    // Validate the data received from the body of the request with the schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Create a meetup
    const meetup = await Meetup.create({
      ...req.body,
      user_id: req.userId,
    });

    return res.json(meetup);
  }
}

export default new MeetupController();
