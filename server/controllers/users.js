const { UserInputError } = require("apollo-server")
const { User } = require("../models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

exports.register = async (_, args) => {
  let { name, email, password } = args
  try {
    password = await bcrypt.hash(password, 6)
    console.log(password)
    let user = await User.create({
      name,
      email,
      password,
    })
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET_CODE, {
        expiresIn: 60 * 60 * 24 * 30 * 365,
      })
      return { ...user.toJSON(), token }
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

exports.login = async (_, args) => {
  let { email, password } = args
  let error = null
  try {
    let user = await User.findOne({
      where: {
        email,
      },
    })

    let correctPassword

    if (!user) {
      error = "Email is not registered"
    }
    if (user) {
      correctPassword = await bcrypt.compare(password, user.password)
    }

    if (error === null) {
      if (!correctPassword) {
        error = "Invalid credentials"
      } else {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_CODE, {
          expiresIn: 60 * 60 * 24 * 30 * 365,
        })
        return { ...user.toJSON(), token }
      }
    } else {
      throw new UserInputError("BAD_INPUT", { error })
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

exports.getUsers = async () => {
  try {
    let users = await User.findAll()
    return users
  } catch (err) {
    throw err
  }
}
