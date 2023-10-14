const rateLimit = require('express-rate-limit');

// Rate limiting middleware per user
exports.userLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 2, // Max 5 requests per minute per user
  message: 'Too many requests. Please try again later.',
  keyGenerator: (req) => req.user.id, // Assuming req.user contains user information with an "id" property
});

// Rate limiting middleware per route
exports.routeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1, // Max 10 requests per minute per route
  message: 'Too many requests. Please try again later.',
  keyGenerator: (req) => req.originalUrl, // Generate rate limit key based on the request URL
});