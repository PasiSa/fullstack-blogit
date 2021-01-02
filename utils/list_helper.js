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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
