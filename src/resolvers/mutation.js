// Импорт пакета для шифрования паролей
const bcrypt = require('bcrypt');
// Импорт пакета для генерации json web token
const jwt = require('jsonwebtoken');
// Подключение переменных окружения .env
require('dotenv').config();

// Импорт функции-генератора ссылки для аватара пользователя
const gravatar = require('../util/gravatar');


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
  },
  updateNote: async (parent, { id, content }, { models }) => {
    return await models.Note.findOneAndUpdate(
      {_id: id},
      {
        $set: {
          content
        }
      },
      {new: true},
    );
  },
  signUp: async (parent, { username, email, password }, { models }) => {
    // Нормализация email
    email = email.trim().toLowerCase();
    // Хеширование пароля
    const hashed = await bcrypt.hash(password, 10);
    // Создаем url аватара
    const avatar = gravatar(email);
    try {
      // Создаем объект нового пользователя
      const user = await models.User.create({
        username,
        email,
        password: hashed,
        avatar,
      });
      return jwt.sign({id: user._id}, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      throw new Error('Error creating account');
    }
  }
};