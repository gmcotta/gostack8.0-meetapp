import nodemailer from 'nodemailer';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import { resolve } from 'path';

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

    this.configureTemplates();
  }

  configureTemplates() {
    // Add the root path of the email templates
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
    // Create the view engine, using the express-handlebars
    const viewEngine = exphbs.create({
      layoutsDir: resolve(viewPath, 'layouts'),
      partialsDir: resolve(viewPath, 'partials'),
      defaultLayout: 'default',
      extname: '.hbs',
    });
    // Add the nodemailer-express-handlebars plugin to the transporter
    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine,
        viewPath,
        extName: '.hbs',
      })
    );
  }

  sendMail(msg) {
    return this.transporter.sendMail({
      ...MailConfig.default,
      ...msg,
    });
  }
}

export default new Mail();
