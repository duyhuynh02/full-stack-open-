const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const saltRounds = 10
  let passwordHash = ''

  if ((password.length > 3) && password) {
    passwordHash = await bcrypt.hash(password, saltRounds)
  } else {
    return response.status(400).send('Password must have or at least 3 characters long.')
  }

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter