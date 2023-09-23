const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body 

  const user = await User.findById(body.userId)

  if (!body.title || !body.url) {
    return response.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author, 
    url: body.url, 
    likes: body.likes, 
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body 

  const blog = {
    likes: body.likes 
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { 'new': true })
  response.status(201).json(updatedBlog)
  
})

module.exports = blogsRouter