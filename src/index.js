const express = require('express');
const { ApolloServer } = require('apollo-server-express');

require('dotenv').config();
const db = require('./db');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Express App
const app = express();
const port = process.env.port || 4000;
const DB_HOST = process.env.DB_HOST;

db.connect(DB_HOST);

// Apollo GraphQL server
const server = new ApolloServer({ typeDefs, resolvers});
server.applyMiddleware({ app, path: '/api'})

app.get('/', (req, res) => res.send('Hello Express'));
app.listen(port, () => console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`))