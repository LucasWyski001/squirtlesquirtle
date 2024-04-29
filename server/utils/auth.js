//This imports the 'jsonwebtoken' mode
const jwt = require('jsonwebtoken');
require('dotenv').config();

//This defines a secret key
const secret = process.env.SECRET;
// This is the expiration time for the JWTs
const expiration = '2h';

//! This exports two functions as part of the module
module.exports = {
  // This authenticates and authorizes users based on JWTs
  authMiddleware: function ({ req }) {
    //This gets the token from the body, query, and header
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      //This removes any spaces if present
      token = token.split(' ').pop().trim();
    }

    //If no token is found, return the request object unchanged
    if (!token) {
      return req;
    }

    try {
       // Verify the token using the secret and expiration
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // Attach the decoded user data to the request object
      req.user = data;
    } catch {
      // Handle invalid tokens (expired or tampered)
      console.log('Invalid token');
    }
    // Return the request object, possibly with user data attached
    return req;
  },
  //This function generates a new JWT token based on user data.
  signToken: function ({ username, email, _id }) {
    // User data to include in the token
    const payload = { username, email, _id };

    // Create and return a new JWT token
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
