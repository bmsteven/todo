const { AuthenticationError, UserInputError } = require("apollo-server")
const { Todo } = require("../models")
const { Op } = require("sequelize")

exports.addTodo = async (_, args, { user }) => {
  if (!user) throw new AuthenticationError("Unauthorized")
  const { title, content, privacy } = args
  try {
    let todo = await Todo.create({
      userId: user.id,
      title,
      content,
      privacy,
      status: "Incomplete",
    })
    return todo
  } catch (err) {
    throw err
  }
}

exports.getTodo = async (_, __, { user }) => {
  if (!user) throw new AuthenticationError("Unauthorized")
  try {
    let todo = await Todo.findAll({
      where: {
        userId: user.id,
      },
    })
    return todo
  } catch (err) {
    throw err
  }
}

exports.updateTodo = async (_, args, { user }) => {
  if (!user) throw new AuthenticationError("Unauthorized")
  const { id, userId, title, content, privacy, status } = args
  let error = null
  try {
    console.log("Hello")
    if (userId === user.id) {
      let todoCheck = await Todo.findOne({
        where: { id },
      })
      if (todoCheck) {
        let todo = await Todo.update(
          {
            title,
            content,
            privacy,
            status,
          },
          {
            where: {
              [Op.and]: [{ id }, { userId }],
            },
          },
          { raw: true }
        )
        console.log(todo)
        return todoCheck
      } else {
        error = "Todo not found"
        throw new UserInputError("BAD_INPUT", { error })
      }
    } else {
      error = "Unauthorized"
      throw new AuthenticationError("Unauthenticated", { error })
    }
  } catch (err) {
    throw err
  }
}
