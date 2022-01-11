// Для реализации вложенных запросов
module.exports = {
  // При запросе разрешается список заметок автора
  notes: async (user, args, { models }) => {
    return await models.Note.find({ author: user._id })
      .sort({ _id: -1 });
  },
  // При запросе разрешается список избранных заметок
  favoriteNotes: async (user, args, { models }) => {
    return await models.Note.find({ favoritedBy: user._id })
      .sort({ _id: -1 });
  }
}