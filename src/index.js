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
    note(id: ID!): Note!,
  }
  type Mutation {
    createNote(content: String!): Note!,
  }
`;

const resolvers = {
  Query: {
    notes: () => mockNotesData,
    note: (parent, args) => mockNotesData.find((note) => note.id === args.id),
  },
  Mutation: {
    createNote: (parent, args) => {
      const newNote = {
        id: mockNotesData.length + 1,
        author: 'Marat Netoshev',
        content: args.content,
        date: Date.now().toString(),
      };
      mockNotesData.push(newNote);
      return newNote;
    }
  },
};

// Apollo GraphQL server
const server = new ApolloServer({ typeDefs, resolvers});
server.applyMiddleware({ app, path: '/api'})

app.get('/', (req, res) => res.send('Hello Express'));
app.listen(port, () => console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`))