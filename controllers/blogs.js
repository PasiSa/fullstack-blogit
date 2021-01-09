const notesRouter = require('express').Router()
const Blog = require('../models/blog')

notesRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(b => b.toJSON()))
})

notesRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.author) {
    response.status(400).end()
  } else {
    const req = { ...request.body, ...(request.body.likes || { likes: 0})}
    const blog = new Blog(req)
    const saved = await blog.save()
    response.status(201).json(saved.toJSON())
  }
})

module.exports = notesRouter
