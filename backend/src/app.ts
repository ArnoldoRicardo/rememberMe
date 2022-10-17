import jwt from 'jsonwebtoken'
import { gql, ApolloServer } from 'apollo-server'

import { findUser } from './services/user'
import Query from './queries'
import Mutation from './mutation'

const typeDefs = gql`
  scalar Date

  type Note {
    title: String!
    content: String!
    date: Date!
  }

  type User {
    username: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    allNotes(hasDelete: Boolean): [Note]
    findNote(title: String!): Note
    me: User
  }
  type Mutation {
    updateCreateNote(
      name: String!
      phone: String!
      street: String!
      city: String!
    ): Note
    createUser(username: String!, password: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query,
  Mutation
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const token = auth.substring(7)
      const jwt_secret = process.env.JWT_SECRET
        ? process.env.JWT_SECRET
        : 'default'
      const decodedToken: User = jwt.verify(token, jwt_secret) as User
      const currentUser = await findUser(decodedToken.username)
      return { currentUser }
    }
  }
})

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
