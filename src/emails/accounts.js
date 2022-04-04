const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.GRID_API_KEY);
const sendEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "abdallahawad4@gmail.com",
    subject: "Welcome",
    text: `Hello ${name} I Hope You Get Confert With My App `,
  });
};
const cancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "abdallahawad4@gmail.com",
    subject: "Goodbye",
    text: `I don't know what annoy you ${name} I think you can contact the offical website if u face any problems`,
  });
};
module.exports = {
  sendEmail,
  cancelEmail,
};
