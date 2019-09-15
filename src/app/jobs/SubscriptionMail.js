import Mail from '../../lib/Mail';

class SubscriptionMail {
  // Get the key of the object
  get key() {
    return 'SubscriptionMail';
  }

  // Job task
  async handle({ data }) {
    // Retrieve the meetup and user info from the subscriber controller
    const { meetup, user } = data;
    // Send mail to the organizer about the subscription
    await Mail.sendMail({
      to: `${meetup.user.name} <${meetup.user.email}>`,
      subject: `New subscription to ${meetup.title}`,
      template: 'subscription',
      context: {
        organizer: meetup.user.name,
        meetup: meetup.title,
        subscriber: user.name,
        email: user.email,
      },
    });
  }
}

export default new SubscriptionMail();
