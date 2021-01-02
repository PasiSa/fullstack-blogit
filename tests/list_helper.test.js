const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

// eslint-disable-next-line quotes
const manyBlogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 } ]


describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const res = listHelper.totalLikes(listWithOneBlog)
    expect(res).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const res = listHelper.totalLikes(manyBlogs)
    expect(res).toBe(36)
  })
})

describe('favorite blog', () => {
  // eslint-disable-next-line quotes
  const highestBlog = { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }

  test('empty list should return null', () => {
    expect(listHelper.favoriteBlog([])).toEqual(null)
  })

  test('when list has only one blog returns that', () => {
    const res = listHelper.favoriteBlog(listWithOneBlog)
    expect(res).toEqual(listWithOneBlog[0])
  })

  test('returns right entry in bigger list', () => {
    const res = listHelper.favoriteBlog(manyBlogs)
    expect(res).toEqual(highestBlog)
  })

})


describe('most blogs', () => {
  test('empty list', () => {
    expect(listHelper.mostBlogs([])).toEqual(null)
  })
  
  test('one blog only', () => {
    const res = listHelper.mostBlogs(listWithOneBlog)
    const ans = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }
    expect(res).toEqual(ans)
  })

  test('many blogs', () => {
    const res = listHelper.mostBlogs(manyBlogs)
    const ans = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(res).toEqual(ans)
  })
})

describe('most likes', () => {
  test('empty list', () => {
    expect(listHelper.mostLikes([])).toEqual(null)
  })
  
  test('one blog only', () => {
    const res = listHelper.mostLikes(listWithOneBlog)
    const ans = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    expect(res).toEqual(ans)
  })

  test('many blogs', () => {
    const res = listHelper.mostLikes(manyBlogs)
    const ans = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(res).toEqual(ans)
  })
})
