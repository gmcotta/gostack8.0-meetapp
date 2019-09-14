import nodemailer from 'nodemailer';
import MailConfig from '../config/mail';

class Mail {
  constructor() {
    // Make the connection between nodemailer and mailtrap
    const { host, port, secure, auth } = MailConfig;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
  }

  sendMail(msg) {
    return this.transporter.sendMail({
      ...MailConfig.default,
      ...msg,
    });
  }
}

export default new Mail();
