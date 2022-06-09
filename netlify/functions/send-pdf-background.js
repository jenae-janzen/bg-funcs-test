const { jsPDF } = require("jspdf");
// const nodemailer = require("nodemailer");
// const mg = require("nodemailer-mailgun-transport");
const mailgun = require("mailgun-js")

const mg = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: processs.env.MAILGUN_DOMAIN
});

exports.handler = async function (event) {
//   const { content, destination } = JSON.parse(event.body);
  const content = "Hello";
  const destination = "jenaejanzen@gmail.com"
  console.log(`Sending PDF report to ${destination}`);

  const report = Buffer.from(
    new jsPDF().text(content, 10, 10).output("arraybuffer")
  );
  console.log(report)

  const info = await mg.messages().send({
    from: process.env.MAILGUN_SENDER,
    to: destination,
    subject: "Your report is ready!",
    text: "See attached report PDF",
    attachments: [
      {
        filename: `report-${new Date().toDateString()}.pdf`,
        content: report,
        contentType: "application/pdf",
      },
    ],
  }, function (error, body) {
      console.log(error, body);  
});

  console.log(`PDF report sent`, info);
};