// Импорт mongoose - библиотка для работы с MongoDB
const mongoose = require('mongoose');

// Создание MongoDB схемы для заметок
const noteSchema = new mongoose.Schema({
  // Описание полей (тип, обязательное)
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  favoriteCount: {
    type: Number,
    default: 0,
  },
  favoritedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    // Ссылаемся на модель пользователя
    ref: 'User', 
  }]
}, { 
  // Добавляем поля createdAt и updatedAt к noteSchema
  timestamps: true,
});
// Определяем модель со схемой заметки
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;