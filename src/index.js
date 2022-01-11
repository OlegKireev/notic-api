const express = require('express');
const { ApolloServer } = require('apollo-server-express');

require('dotenv').config();
const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');

// Express App
const app = express();
const port = process.env.port || 4000;
const DB_HOST = process.env.DB_HOST;

db.connect(DB_HOST);

const resolvers = {
  Query: {
    notes: async () => await models.Note.find(),
    note: async (parent, args) => await models.Note.findById(args.id),
  },
  Mutation: {
    createNote: async (parent, args) => {
      return await models.Note.create({
        author: 'Oleg Kireev',
        content: args.content,
      });
    }
  },
};

// Apollo GraphQL server
const server = new ApolloServer({ typeDefs, resolvers});
server.applyMiddleware({ app, path: '/api'})

app.get('/', (req, res) => res.send('Hello Express'));
app.listen(port, () => console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`))