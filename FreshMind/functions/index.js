/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const functions = require("firebase-functions");
const cors = require("cors")({origin: true});
const postmark = require('postmark');

const client = new postmark.ServerClient("REDCATED_KEY");

exports.sendEmail = onRequest(async (req, res) =>{
  cors(req, res, async () => {
    const {from, subject, message} = req.body;
    if (!from || !subject || !message) {
      return res.status(400).send("Missing required fields.");
    }
    try {
      const response = await client.sendEmail({
        From: from,
        To: "brid0004@student.monash.edu",
        Subject: subject,
        TextBody: message,
      });
      console.log("Email sent successfully: ", response);
      return res.status(200).send("Email sent successfully");
    } catch(error) {
      console.error("Error sending email: ", error);
      return res.status(500).send("Error sending email")
    }
  });
})


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
