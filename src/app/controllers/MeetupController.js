import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';

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

    // Extract the date field from the body of the request
    const { date } = req.body;

    const hourStart = startOfHour(parseISO(date));
    // Check if the informed date is before than today
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not accepted' });
    }

    // Check meetup availability
    const availability = await Meetup.findOne({
      where: {
        user_id: req.userId,
        date: hourStart,
      },
    });

    if (availability) {
      return res.status(400).json({ error: 'This date is already used' });
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
