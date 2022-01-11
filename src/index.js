require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Express App
const port = process.env.port || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();

db.connect(DB_HOST);

// Apollo GraphQL server
const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  context: () => ({
    models,
  })
});
server.applyMiddleware({ app, path: '/api'})

app.get('/', (req, res) => res.send('Hello Express'));
app.listen(port, () => console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`))