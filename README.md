This is a full stack application which sends SMS by using AWS SNS.

To send the SMS:
1. User sends a post request to /text end point.
2. To restrict any user from sending SMS , an authentication using auth0 has been implemented.
3. User logs in and obtain a token from auth0 and then send that token as authorization header, bearer token , to send the SMS .


There are env vars required to get this app working.

During development you have two  .env files.

1. app/frontend/.env  (Please replace these values with actuals from your auth0 account ). 

    REACT_APP_AUTH0_DOMAIN = auth0_DOMAIN
    REACT_APP_AUTH0_CLIENT_ID = auth0_Client_Id (It should be a SPA) 
    REACT_APP_AUTH0_AUDIENCE = auth0_API_Audience
    REACT_APP_AUTH0_ISSUER = auth0_Issuer
    
For set up instructions, refer to https://auth0.com/docs/quickstart/spa/react/01-login .    
    
2. app/server/.env  (Please replace these values with actuals from your auth0 account ). 

    AWS_REGION= YOUR_AWS_REGION
    AWS_SECRET_ACCESS_KEY= YOUR_AWS_SECERET_KEY
    AWS_ACCESS_KEY_ID= YOUR_AWS_ACCESS_KEY
    AUTH0_JWKS_URI = auth0_jwks_URL
    AUTH0_AUDIENCE = auth0_API_Audience
    AUTH0_ISSUER = auth0_Issuer
    
  For setup instructions, refer to https://auth0.com/docs/quickstart/backend/nodejs
