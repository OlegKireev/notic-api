const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mockNotesData = require('./mock/notes');

// Express App
const app = express();
const port = process.env.port || 4000;

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
  }
`;

const resolvers = {
  Query: {
    notes: () => mockNotesData,
  },
};

// Apollo GraphQL server
const server = new ApolloServer({ typeDefs, resolvers});
server.applyMiddleware({ app, path: '/api'})

app.get('/', (req, res) => res.send('Hello Express'));
app.listen(port, () => console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`))