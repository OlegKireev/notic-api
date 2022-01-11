module.exports = {
  notes: async (parent, args, { models }) => await models.Note.find(),
  note: async (parent, args, { models }) => await models.Note.findById(args.id),
  noteFeed: async (parent, { cursor, limit = 10 }, { models }) => {
    // Устанавливаем значение false по умолчанию для hasNextPage
    let hasNextPage = false;
    // Если курсор передан не будет, то по умолчанию запрос будет пуст // В таком случае из БД будут извлечены последние заметки
    let cursorQuery = {};
    // Если курсор задан, запрос будет искать заметки со значением ObjectId // меньше этого курсора
    if (cursor) {
      cursorQuery = { _id: { $lt: cursor } };
    }

     // Находим в БД limit заметок, сортируя их от старых к новым
    let notes = await models.Note.find(cursorQuery)
      .sort({ _id: -1 })
      .limit(limit);
    
    // Если число найденных заметок превышает limit, устанавливаем // hasNextPage как true и обрезаем заметки до лимита
    if (notes.length >= limit) {
      hasNextPage = true;
      notes.slice(0, -1);
    }
    
    // Новым курсором будет ID Mongo-объекта последнего элемента массива списка
    const newCursor = notes[notes.length - 1]._id;

    return {
      notes,
      cursor: newCursor,
      hasNextPage,
    }
  },
  users: async (parent, args, { models }) => await models.User.find({}),
  user: async (parent, { username }, { models }) => await models.User.findOne({ username }),
  me: async (parent, args, { models, user }) => await models.User.findById(user.id),
}