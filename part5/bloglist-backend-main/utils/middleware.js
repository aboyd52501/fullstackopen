/*
This module defines several middleware functions to be used in the Express application:

- `requestLogger`: logs information about incoming requests, such as the HTTP method, request path, and request body.

- `tokenExtractor`: extracts the JWT token from the Authorization header of a request, if present, and adds it to the request object as `req.token`.

- `userExtractor`: uses the JWT token to find the corresponding user in the database and adds the user object to the request object as `req.user`. If the token is invalid or the user cannot be found, an appropriate error response is sent instead.

- `unknownEndpoint`: sends a 404 error response for unknown endpoints.

- `errorHandler`: handles errors thrown by other middleware functions or route handlers. The specific error types handled are `CastError` (thrown by Mongoose when a query parameter is malformed), `ValidationError` (thrown by Mongoose when a model fails validation), `JsonWebTokenError` (thrown by the `jsonwebtoken` library when a JWT token is invalid), and `TokenExpiredError` (thrown by `jsonwebtoken` when a JWT token has expired). All other errors are passed on to the default error handler.
*/
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('./logger');

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:', req.path);
  logger.info('Body:', req.body);
  logger.info('---');
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  } else req.token = null;

  next();
};

const userExtractor = async (req, res, next) => {
  if (req.token) {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({
        error: 'token missing or invalid',
      });
    }
    const user = await User.findById(decodedToken.id);

    if (!user) return res.status(400).json({ error: 'user not found' });

    req.user = user;
  }

  return next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err);

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformed id' });
  } if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  } if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: err.message });
  } if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'login session expired' });
  }

  return next(err);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
