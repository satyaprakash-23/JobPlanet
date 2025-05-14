const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "satyaprakash947363@gmail.com",
    pass: "uazp wvsl qosx ydjz", // NOT your actual Gmail password
  },
});

transporter.sendMail({
  from: '"Satya Prakash" <satyaprakash947363@gmail.com>',
  to: "satyaprakash8471@gmail.com",
  subject: "Welcome",
  html: "<h1>Hello User</h1>",
});
