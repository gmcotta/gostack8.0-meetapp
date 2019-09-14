import Notifications from '../schemas/Notifications';
import Meetup from '../models/Meetup';

class NotificationController {
  async index(req, res) {
    // Check if the logged user owns a meetup
    const checkOrganizer = await Meetup.findOne({
      where: { user_id: req.userId },
    });
    if (!checkOrganizer) {
      return res
        .status(401)
        .json({ error: 'You are not an organizer of any meetup.' });
    }

    // Find all the notifications that the organizer of the meetups is the logged user
    const notifications = await Notifications.find({
      user: req.userId,
    })
      // Order by the most recent subscriptions
      .sort({ createdAt: 'DESC' })
      // Limit the number of subscriptions by 20
      .limit(20);
    return res.json(notifications);
  }
}

export default new NotificationController();
