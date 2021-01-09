const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.author) {
    response.status(400).end()
  } else {
    const req = { ...request.body, ...(request.body.likes || { likes: 0})}
    const blog = new Blog(req)
    const saved = await blog.save()
    response.status(201).json(saved.toJSON())
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const modified = {
    likes: request.body.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, modified, { new: true})
  response.status(200).end()
})

module.exports = blogsRouter
