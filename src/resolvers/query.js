const models = require('../models');

module.exports = {
  notes: async () => await models.Note.find(),
  note: async (parent, args) => await models.Note.findById(args.id),
}