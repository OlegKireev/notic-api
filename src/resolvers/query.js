module.exports = {
  notes: async (parent, args, { models }) => await models.Note.find(),
  note: async (parent, args, { models }) => await models.Note.findById(args.id),
  users: async (parent, args, { models }) => await models.User.find({}),
  user: async (parent, { username }, { models }) => await models.User.findOne({ username }),
  me: async (parent, args, { models, user }) => await models.User.findById(user.id),
}