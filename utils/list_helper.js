const dummy = () => {
  return(1)
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev, cur) => prev + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
  const res = blogs.reduce((prev, cur) => {
    if (!prev || cur.likes > prev.likes) {
      return cur
    } else {
      return prev
    }
  }, null)
  return res
}

const mostBlogs = (blogs) => {
  var authors = []
  blogs.forEach(element => {
    const found = authors.findIndex(e2 => e2.author === element.author)
    if (found >= 0) {
      authors[found].blogs += 1
    } else {
      const a = {
        author: element.author,
        blogs: 1
      }
      authors = authors.concat(a)
    }
  })
  const res = authors.reduce((prev, cur) => {
    if (!prev || cur.blogs > prev.blogs) {
      return cur
    } else {
      return prev
    }
  }, null)
  return res
}

const mostLikes = (blogs) => {
  var authors = []
  blogs.forEach(element => {
    const found = authors.findIndex(e2 => e2.author === element.author)
    if (found >= 0) {
      authors[found].likes += element.likes
    } else {
      const a = {
        author: element.author,
        likes: element.likes
      }
      authors = authors.concat(a)
    }
  })  
  const res = authors.reduce((prev, cur) => {
    if (!prev || cur.likes > prev.likes) {
      return cur
    } else {
      return prev
    }
  }, null)
  return res
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
