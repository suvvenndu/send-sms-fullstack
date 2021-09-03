const express = require('express');
const bodyparser = require('body-parser');
const app = express();
require('dotenv').config();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');


var AWS = require('aws-sdk');

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.AUTH0_JWKS_URI
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ['RS256']
});

app.use(jwtCheck);
app.use(bodyparser.json())

if (app.get('env') === 'production') {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;

  // Uncomment the line below if your application is behind a proxy (like on Heroku)
  // or if you're encountering the error message:
  // "Unable to verify authorization request state"
  // app.set('trust proxy', 1);
}


app.post('/text', (req, res) => {

    console.log('Req', req.body);

    var params = {
        Message: req.body.message,
        PhoneNumber: '+' + req.body.number,
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': req.body.subject
            }
        }
    };

    var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

    publishTextPromise.then(
        function (data) {
            res.end(JSON.stringify({ MessageID: data.MessageId }));
        }).catch(
            function (err) {
                res.end(JSON.stringify({ Error: err }));
            });

});

app.listen(3000, () => console.log('SMS Service Listening on PORT 3000'))