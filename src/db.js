// Импорт mongoose - библиотка для работы с MongoDB
const mongoose = require('mongoose');

module.exports = {
  // Метода подключения к БД
  connect: (DB_HOST) => {
    // Используем обновленный парсер строки URL драйвера Mongo
    mongoose.set('useNewUrlParser', true);
    // Поставим findOneAndUpdate () вместо findAndModify ()
    mongoose.set('useFindAndModify', false);
    // Поставим createIndex () вместо sureIndex ()
    mongoose.set('useCreateIndex', true);
    // Используем новый механизм обнаружения и мониторинга серверов
    mongoose.set('useUnifiedTopology', true);

    // Подлючение к БД
    mongoose.connect(DB_HOST);

    // Обработчик ошибки подключение к БД
    mongoose.connection.on('error', (err) => {
      console.err(err);
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running.'
      );
      // Завершить работу NodeJS приложения
      process.exit();
    });
  },
  // 
  close: () => {
    // Метод отключения от БД
    mongoose.connection.close();
  }
}