// Импорт пакета для шифрования паролей
const bcrypt = require('bcrypt');
// Импорт пакета для генерации json web token
const jwt = require('jsonwebtoken');
// Импорт утилит Apollo для обработки ошибок
const {
  AuthenticationError,
} = require('apollo-server-express');
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
      // Возвращаем json web token
      return jwt.sign({id: user._id}, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      throw new Error('Error creating account');
    }
  },
  signIn: async (parent, {username, email, password}, { models }) => {
    // Нормализация email
    if (email) {
      email = email.trim().toLowerCase();
    }

    // Ищем пользователя в БД по полям email или username
    const user = await models.User.findOne({
      $or: [{ email }, { username }]
    });
    
    // Если пользователь не найден, выбрасываем ошибку аутентификации
    if (!user) {
      throw new AuthenticationError('Error singing in');
    }

    // Сравнение введенного пароля с паролем в БД
    const valid = await bcrypt.compare(password, user.password);

    if(!valid) {
      throw new AuthenticationError('Error singing in');
    }

    // Возвращаем json web token
    return jwt.sign({id: user._id}, process.env.JWT_SECRET);
  }
};