const { gql } = require("apollo-server")

module.exports = gql`
  type User {
    id: Int!
    name: String!
    createdAt: String!
    token: String
  }
  type Todo {
    id: Int!
    userId: Int!
    title: String!
    content: String!
    status: String!
    privacy: String!
  }
  type Query {
    login(email: String!, password: String!): User!
    getUsers: [User]
    getTodo: [Todo]
  }
  type Mutation {
    register(name: String!, email: String!, password: String!): User!
    addTodo(title: String!, content: String!, privacy: String!): Todo!
    updateTodo(
      id: Int!
      userId: Int!
      title: String
      content: String
      privacy: String
      status: String
    ): Todo
  }
`
