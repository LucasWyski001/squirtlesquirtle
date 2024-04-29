const { gql } = require('apollo-server-express');


//User information
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    fountains: [Fountain]!
    saved: [Fountain]!
  }
  
  type Fountain {
    _id: ID
    lat: String
    lng: String
    address: String!
    place: String
    city: String!
    state: String!
    datePosted: String
    image: String
    postAuthor: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    fountains: [Fountain]
    fountain(fountainId: ID!): Fountain
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addFountain(address: String!, place: String, city: String!, state: String!, image: String): Fountain
    saveFountain(fountainId: ID!): Fountain
  }
`

module.exports = typeDefs;

//TODO: figure out how to upload pictures