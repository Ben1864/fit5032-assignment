/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const AWS = require("aws-sdk");
const cors = require("cors")({origin: true});
const {Buffer} = require("buffer");
const admin = require("firebase-admin");

admin.initializeApp();


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-southeast-2",
});

const ses = new AWS.SES();

exports.sendEmail = onRequest(async (req, res) =>{
  cors(req, res, async () => {
    const {to, subject, message, attachments} = req.body;
    if (!to || !subject || !message) {
      return res.status(400).send("Missing required fields.");
    }
    try {
      const boundary = "NextPart";
      let emailBody = [
        `From: ridgesben1864@gmail.com`,
        `To: ${to}`,
        `Subject: ${subject}`,
        `MIME-Version: 1.0`,
        `Content-Type: multipart/mixed; boundary="${boundary}"`,
        ``,
        `--${boundary}`,
        `Content-Type: text/plain; charset=UTF-8`,
        `Content-Transfer-Encoding: 7bit`,
        ``,
        `${message}`,
        ``,
      ].join("\n");
      // If there is an attachment, append it to the email body
      if (attachments && attachments.length>0) {
        for (const attachment of attachments) {
          emailBody += [
            `--${boundary}`,
            `Content-Type: application/octet-stream;` +
            ` name="${attachment.filename}"`,
            `Content-Description: ${attachment.filename}`,
            `Content-Disposition: attachment;` +
            ` filename="${attachment.filename}";`,
            `Content-Transfer-Encoding: base64`,
            ``,
            `${attachment.data}`,
            ``,
          ].join("\n");
        }
      }
      emailBody += `--${boundary}--`;
      const params = {
        RawMessage: {
          Data: Buffer.from(emailBody),
        },
        Source: "ridgesben1864@gmail.com",
        Destinations: [to],
      };
      await ses.sendRawEmail(params).promise();
      return res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error sending email: ", error);
      return res.status(500).send("Error sending email");
    }
  });
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
