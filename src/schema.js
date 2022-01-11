const { gql } = require('apollo-server-express');

module.exports = gql`
  type Note {
    id: ID!,
    content: String!
    author: String!
    date: String!
  }
  type Query {
    notes: [Note!]!
    note(id: ID!): Note!
  }
  type Mutation {
    createNote(content: String!): Note!
    removeNote(id: ID!): Boolean!
  }
`