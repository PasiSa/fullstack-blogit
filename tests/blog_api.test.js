const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

// eslint-disable-next-line quotes
const manyBlogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 } ]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(manyBlogs)
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are correct number of blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(manyBlogs.length)
})

test('id field exists', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach((i) => {
    expect(i.id).toBeDefined()
  })
})

test('blog can be added', async() => {
  const newBlog = {
    title: 'yykaakoo',
    author: 'Tuure Tuppurainen',
    url: 'http://jshdjs/shh',
    likes: 3
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const resp = await api.get('/api/blogs')
  const titles = resp.body.map(r => r.title)

  expect(resp.body).toHaveLength(manyBlogs.length + 1)
  expect(titles).toContain('yykaakoo')
})

test('handle missing likes field', async() => {
  const newBlog = {
    title: 'Maalari',
    author: 'Kerttu Keppurainen',
    url: 'http://adihf/index',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const resp = await api.get('/api/blogs')
  const added = resp.body.find(b => b.title === 'Maalari')
  expect(added.likes).toBeDefined()
})

test('should fail if title and url do not exist', async() => {
  const new1 = {
    author: 'Tuure Tuppurainen',
    url: 'http://jshdjs/shh',
    likes: 3
  }
  await api
    .post('/api/blogs')
    .send(new1)
    .expect(400)
  
  const new2 = {
    title: 'Maalari',
    url: 'http://adihf/index',
    likes: 1
  }
  await api
    .post('/api/blogs')
    .send(new2)
    .expect(400)
})

test('deletion of note works as intended', async() => {
  const blogsAtStart = await blogsInDb()
  const toDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${toDelete.id}`)
    .expect(204)

  const blogsAtEnd = await blogsInDb()

  expect(blogsAtEnd).toHaveLength(manyBlogs.length - 1)

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).not.toContain(toDelete.title)
})

test('modification of note works as intended', async() => {
  const blogsAtStart= await blogsInDb()
  const toModify = blogsAtStart[0]
  const modified = { ...toModify, likes: 10 }
  
  await api
    .put(`/api/blogs/${toModify.id}`)
    .send(modified)
    .expect(200)

  const changed = await Blog.findById(toModify.id)
  expect(changed.likes).toEqual(10)
})

afterAll(() => {
  mongoose.connection.close()
})
