// Импорт mongoose - библиотка для работы с MongoDB
const mongoose = require('mongoose');

// Создание MongoDB схемы для пользователей
const userSchema = new mongoose.Schema({
  // Описание полей (тип, обязательное)
  username: {
    type: String,
    required: true,
    // Уникальные значения в БД
    index: {
      unique: true,
    },
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
}, { 
  // Добавляем поля createdAt и updatedAt
  timestamps: true,
});
// Определяем модель со схемой пользователя
const User = mongoose.model('User', userSchema);

module.exports = User;