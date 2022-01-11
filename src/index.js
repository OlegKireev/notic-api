const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

require('dotenv').config();
const db = require('./db');
const models = require('./models');
const mockNotesData = require('./mock/notes');

// Express App
const app = express();
const port = process.env.port || 4000;
const DB_HOST = process.env.DB_HOST;

db.connect(DB_HOST);

// Scheme
const typeDefs = gql`
  type Note {
    id: ID!,
    content: String!,
    author: String!,
    date: String!,
  }
  type Query {
    notes: [Note!]!,
    note(id: ID!): Note!,
  }
  type Mutation {
    createNote(content: String!): Note!,
  }
`;

const resolvers = {
  Query: {
    notes: async () => await models.Note.find(),
    note: (parent, args) => mockNotesData.find((note) => note.id === args.id),
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