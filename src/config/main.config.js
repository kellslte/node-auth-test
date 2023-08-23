import { config as variableConfig } from 'dotenv'
import mongoose from 'mongoose';
import { join } from 'path';
variableConfig();

const config = {
  server: {
    port: parseInt(process.env.PORT, 10),
    mode: process.env.NODE_ENV,
  },
  storage: {
    publicPath: function (filename) {
      return join(process.cwd(), `./src/public/uploads/${filename}`);
    },
    templatePath: function ()
    {
      return join(process.cwd(), `./src/providers/mail/templates/`);
     },
  },
  connectToDatabase: async function () {
    await mongoose.connect(process.env.MONGODB_URI);

    mongoose.connection.on("error", (e) =>
      console.error(
        `We encountered the following error while trying to conenct to the database: ${e.message} ☣ `
      )
    );

    mongoose.connection.on("open", () =>
      console.info("Connected to Mongoose database 🚀 ")
    );
  },
  services: {
    mail: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    },
    jwt: {
      expiresIn: "1hr",
      secret: process.env.JWT_SECRET,
    },
  },
};

export default config;