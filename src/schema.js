// Импорт функции для создания GraphQL схемы
const { gql } = require('apollo-server-express');

// Формируем объект typeDefs для ApolloServer
module.exports = gql`
  # Создание пользовательского скалярного типа данных для дат 
  scalar DateTime
  # Описание типа для пользователей
  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    notes: [Note!]!
    favoriteNotes: [Note!]!
  }
  # Описание типа для основной сущности приложения - заметки 
  type Note {
    # ключ: тип значения (! - обязательное поле)
    id: ID!,
    content: String!
    author: User!
    favoriteCount: Int!
    favoritedBy: [User!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  # Описание типов для запросов
  type Query {
    # ключ запроса: тип возвращаемого значения (здесь: обязательный массив объектов Note)
    notes: [Note!]!
    # ключ запроса(ключ аргумета: тип аргумента): тип возвращаемого значения
    note(id: ID!): Note!
    me: User!
    users: [User!]!
    user(username: String!): User
  }
  # Описание типов для мутаций
  type Mutation {
    createNote(content: String!): Note!
    updateNote(id: ID!, content: String!): Note!
    removeNote(id: ID!): Boolean!

    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
  }
`