import nodemailer from "nodemailer";
import config from "../../config/main.config.js";
import hbs from "nodemailer-express-handlebars";

const mailer = nodemailer.createTransport( config.services.mail );

// configure the template handler
mailer.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs",
      layoutsDir: "templates/",
      defaultLayout: false,
    },
    viewPath: config.storage.templatePath(),
    extName: ".hbs",
  })
);

// send the mail here
export const sendMail = function ( payload, template )
{
    return mailer.sendMail( {
        to: payload.to,
        from: 'Wonderful App <swift@wonderapp.com>',
        subject: payload.subject,
        template: template,
        context: payload.context
    } );
}