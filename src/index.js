// Импортируем переменные окружения .env
require('dotenv').config();
// Импорт express - Фреймворк для создания NodeJS серверного приложения
const express = require('express');
// Пакет настройки http заголовков Express-приложения для повышения безопасности
const helmet = require('helmet');
// Пакет для активации кросс-доменных запросов
const cors = require('cors');
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
const getUserByToken = require('./util/user').getUserByToken;

// Устанавливаем рабочий порт приложения
const port = process.env.port || 4000;
// Получаем адрес БД из .env
const DB_HOST = process.env.DB_HOST;

// Создаем express-серверное приложение
const app = express();
// Подключаем middlewares к приложению
app.use(helmet());
app.use(cors());

// Подключаемся к БД
db.connect(DB_HOST);

// Конфигурация Apollo GraphQL сервера
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Получаем jwt-токен из заголовков запроса
    const token = req.headers.authorization;
    // Получаем объект пользователя по токену
    const user = getUserByToken(token);
    console.log(user);
    return {
    // Передаем модели БД в контекст для доступа в Queries и Mutations
    models,
    user,
  }}
});
// Подключаем к Apollo GraphQL серверу Express-приложение в качестве middleware и указываем путь к api
server.applyMiddleware({ app, path: '/api'})

// Обработка GET-запроса к корню сайта и возвращение 'Hello World' сообщения
app.get('/', (req, res) => res.send('Hello Express'));
// Вывод в консоль сообщения о старте сервера
app.listen(port, () => console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`))