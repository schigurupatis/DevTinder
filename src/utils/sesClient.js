
// snippet-start:[ses.JavaScript.createclientv3]
//import { SESClient } from "@aws-sdk/client-ses";
const { SESClient } = require("@aws-sdk/client-ses");
// Set the AWS Region.
const REGION = "us-east-1";
// Create SES service object.
const sesClient = new SESClient({ region: REGION, credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    },
 });
//export { sesClient };
module.exports = { sesClient };
// snippet-end:[ses.JavaScript.createclientv3]