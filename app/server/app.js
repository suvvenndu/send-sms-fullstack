const express = require("express");
const bodyparser = require("body-parser");
const app = express();
var cors = require("cors");
require("dotenv").config();
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const session = require("express-session");

var AWS = require("aws-sdk");

app.use(cors());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH0_JWKS_URI,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ["RS256"],
});

//Setting session is required for some reason when working on docker container
//Elese you will get an error secure need to set to true
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
      //secure: true,
      maxAge: 60 * 60 * 1000,
    },
  })
);
app.use(jwtCheck);
app.use(bodyparser.json());

if (app.get("env") === "production") {
  // Uncomment the line below if your application is behind a proxy (like on Heroku)
  // or if you're encountering the error message:
  // "Unable to verify authorization request state"
  // app.set('trust proxy', 1);
}

app.post("/text", (req, res) => {
  console.log("Req", req.body);

  var params = {
    Message: req.body.message,
    PhoneNumber: "+" + req.body.number,
    MessageAttributes: {
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: req.body.subject,
      },
    },
  };

  var publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  publishTextPromise
    .then(function (data) {
      res.end(JSON.stringify({ MessageID: data.MessageId }));
    })
    .catch(function (err) {
      res.end(JSON.stringify({ Error: err }));
    });
});

app.listen(5000, () => console.log("SMS Service Listening on PORT 5000"));
