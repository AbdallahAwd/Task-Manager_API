const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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"
);
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
