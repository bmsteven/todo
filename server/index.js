const { ApolloServer } = require("apollo-server")
const { sequelize } = require("./models")
const dotenv = require("dotenv")
const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")
const contextMiddleware = require("./utils/contexMiddleware")

dotenv.config()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware,
})

server.listen().then(({ url }) => {
  console.log("App is listening " + url)
  sequelize
    .authenticate()
    .then(() => {
      console.log("database connected...!!")
    })
    .catch((err) => console.log(err))
})
