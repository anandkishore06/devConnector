const { SESClient } =  require("@aws-sdk/client-ses");

// Set the AWS Region
const REGION = "ap-south-1"; // change this to your SES region

// Create SES service client
const sesClient = new SESClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

module.exports = {sesClient}
