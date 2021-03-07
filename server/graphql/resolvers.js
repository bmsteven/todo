const { register, login, getUsers } = require("../controllers/users")
const { addTodo, getTodo, updateTodo } = require("../controllers/todo")

module.exports = {
  Query: {
    login,
    getUsers,
    getTodo,
  },
  Mutation: {
    register,
    addTodo,
    updateTodo,
  },
}
