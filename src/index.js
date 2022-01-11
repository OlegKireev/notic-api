// Импортируем переменные окружения .env
require('dotenv').config();
// Импорт express - Фреймворк для создания NodeJS серверного приложения
const  express = require('express');
// Импорт Apollo - библиотека для расширения возожностей серверного приложения и передачи данных в виде GraphQL
const { ApolloServer } = require('apollo-server-express');

// Импорт базы данных
const db = require('./db');
// Импорт моделей БД
const models = require('./models');
// Импорт схемы GraphQL
const typeDefs = require('./schema');
// Импорт резолверов GraphQL для получения данных из БД
const resolvers = require('./resolvers');

// Устанавливаем рабочий порт приложения
const port = process.env.port || 4000;
// Получаем адрес БД из .env
const DB_HOST = process.env.DB_HOST;

// Создаем express-серверное приложение
const app = express();

// Подключаемся к БД
db.connect(DB_HOST);

// Конфигурация Apollo GraphQL сервера
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    // Передаем модели БД в контекст для доступа в Queries и Mutations
    models,
  })
});
// Подключаем к Apollo GraphQL серверу Express-приложение в качестве middleware и указываем путь к api
server.applyMiddleware({ app, path: '/api'})

// Обработка GET-запроса к корню сайта и возвращение 'Hello World' сообщения
app.get('/', (req, res) => res.send('Hello Express'));
// Вывод в консоль сообщения о старте сервера
app.listen(port, () => console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`))