const jwt = require('jsonwebtoken');
require('dotenv').config();

const getUserByToken = (token) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
      throw new Error('Session is invalid')
    }
  }
}

module.exports = {
  getUserByToken
}