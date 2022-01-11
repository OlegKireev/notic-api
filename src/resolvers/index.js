// Подключение пакета для превращания timestamps в строки ISO
const GraphQLDateTime = require('graphql-iso-date');
const Query = require('./query');
const Mutation = require('./mutation');

// Формируем объект resolvers для ApolloServer
module.exports = {
  Query,
  Mutation,
  DateTime: GraphQLDateTime,
}