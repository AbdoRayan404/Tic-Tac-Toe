const rateLimiter = require('express-rate-limit');

module.exports = rateLimiter({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: 'you need to wait before doing this again.'
})