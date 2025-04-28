const { SendEmailCommand } = require("@aws-sdk/client-ses");
const {sesClient} = require("./sesClient");
// Create the SendEmailCommand with dynamic parameters
const createSendEmailCommand = (toAddress, fromAddress) => {
  return new SendEmailCommand({
    Source: fromAddress,
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Subject: {
        Data: "Test Email from SES",
        Charset: "UTF-8",
      },
      Body: {
        Text: {
          Data: "This is a test email sent using Amazon SES and the AWS SDK v3.",
          Charset: "UTF-8",
        },
      },
    },
  });
};

// Run the function to send email
const run = async () => {
  const command = createSendEmailCommand(
    "anandpratyush272@gmail.com",
    "anandkishore060@gmail.com"
  );
  try {
    const response = await sesClient.send(command);
    console.log("Email sent successfully:", response.MessageId);
  } catch (err) {
    console.error("Failed to send email:", err);
  }
};

module.exports = {run};
