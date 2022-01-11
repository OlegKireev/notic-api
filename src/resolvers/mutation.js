module.exports = {
  createNote: async (parent, args, { models }) => {
    return await models.Note.create({
      author: 'Oleg Kireev',
      content: args.content,
    });
  }
};