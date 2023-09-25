const User = require('../models/user')
const jwt = require('jsonwebtoken')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const tokenUser = (user) => {
  const userForToken = {
    username: user.username,
    id: user.id 
  }

  const token = jwt.sign(userForToken, process.env.SECRET)
  return token 
  
}

module.exports = {
  usersInDb, tokenUser
}