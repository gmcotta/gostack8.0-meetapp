import { isBefore } from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import Subscriber from '../models/Subscriber';

import Notification from '../schemas/Notifications';
import User from '../models/User';

class SubscriberController {
  async index(req, res) {
    // Find all meetups subscribed by the logged user
    const meetups = await Subscriber.findAll({
      where: {
        user_id: req.userId,
      },
      // Check past dates
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            date: { [Op.gte]: new Date() },
          },
          attributes: [
            'id',
            'title',
            'description',
            'location',
            'date',
            'banner_id',
          ],
        },
      ],
      // Order by the most recent meetups
      order: [[{ model: Meetup, as: 'meetup' }, 'date', 'ASC']],
      attributes: ['id'],
    });
    return res.json(meetups);
  }

  async store(req, res) {
    const meetup = await Meetup.findByPk(req.params.meetupId);

    // Check if the logged user is not the organizer of the meetup
    if (req.userId === meetup.user_id) {
      return res
        .status(401)
        .json({ error: 'You cannot subscribe to your own meetup!' });
    }

    // Check if the meetup has already happened
    if (isBefore(meetup.date, new Date())) {
      return res
        .status(400)
        .json({ error: 'You cannot subscribe to a past meetup' });
    }

    // Check if the user has already subscribed to this meetup
    const sameMeetup = await Subscriber.findOne({
      where: {
        meetup_id: req.params.meetupId,
        user_id: req.userId,
      },
    });
    if (sameMeetup) {
      return res
        .status(400)
        .json({ error: 'You can subscribe to a meetup only once' });
    }

    // Check availability of the meetup
    const availability = await Subscriber.findOne({
      where: { user_id: req.userId },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            date: meetup.date,
          },
        },
      ],
    });
    if (availability) {
      return res.status(400).json({
        error: 'You cannot subscribe to two meetup at the same time',
      });
    }

    // Subscribe to a meetup
    const subscription = await Subscriber.create({
      user_id: req.userId,
      meetup_id: meetup.id,
    });

    // Notify organizer about the subscription
    const user = await User.findByPk(req.userId);

    // Format subscription date to day month year, hour:minute
    /*
    const formattedDate = format(
      parseISO(subscription.created_at),
      "DD MMMM YYYY', 'HH':'mm"
    );
    */

    // Store notification on schema
    await Notification.create({
      content: `New subscription for the meetup: ${meetup.title}.
      Subscriber: ${user.name} (${user.email})`,
      user: meetup.user_id,
    });

    return res.json(subscription);
  }
}

export default new SubscriberController();
