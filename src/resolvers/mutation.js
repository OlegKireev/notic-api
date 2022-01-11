module.exports = {
  createNote: async (parent, args, { models }) => {
    return await models.Note.create({
      author: 'Oleg Kireev',
      content: args.content,
    });
  },
  removeNote: async (parent, { id }, { models }) => {
    try {
      await models.Note.findOneAndRemove({_id: id});
      return true;
    } catch (err) {
      return false;
    }
  }
};