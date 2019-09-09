import * as Yup from 'yup';
import { Op } from 'sequelize';
import {
  startOfHour,
  parseISO,
  isBefore,
  startOfDay,
  endOfDay,
} from 'date-fns';

import File from '../models/File';
import Meetup from '../models/Meetup';
import User from '../models/User';

class MeetupController {
  // List all meetups
  async index(req, res) {
    // Define current page, date and items per page
    const { page, date } = req.query;
    const itemsPerPage = 10;

    // Transform the string date into a date value
    const parsedDate = parseISO(date);

    // Check if page value exists
    if (page === '' || page === null || page === undefined) {
      return res.status(400).json({ error: 'Invalid query' });
    }

    // Check if date value exists
    if (date === '' || date === null || date === undefined) {
      const meetups = await Meetup.findAll({
        order: ['date'],
        limit: itemsPerPage,
        offset: (page - 1) * itemsPerPage,
        attributes: ['id', 'title', 'description', 'location', 'date'],
        include: [
          {
            model: File,
            as: 'banner',
            attributes: ['id', 'path', 'url'],
          },
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'email'],
          },
        ],
      });
      return res.json(meetups);
    }

    /*
     * Find all meetups, order by date, set offset of 10 items and add the file
     * and user fields
     */

    const meetups = await Meetup.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
      attributes: ['id', 'title', 'description', 'location', 'date'],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
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
