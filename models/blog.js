const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.method('transform', () => {
  var obj = this.toObject()
 
  //Rename fields
  obj.id = obj._id
  delete obj._id
 
  return obj
})

blogSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('Blog', blogSchema)
