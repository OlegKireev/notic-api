const models = require('../models');

module.exports = {
  createNote: async (parent, args) => {
    return await models.Note.create({
      author: 'Oleg Kireev',
      content: args.content,
    });
  }
};