import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog}) => {

  const blogStyle = {
    margin: '8px 0 8px 0',
    border: '1px solid',
    padding: 8,
  }

  const [open, setOpen] = useState()

  const toggleVisibility = () => setOpen(!open)

  const hideOpen = {
    display: open ? 'none' : '',
  }

  const showOpen = {
    display: open ? '' : 'none',
  }

  const likeThis = e => {
    blogService
      .like(blog)
      .then(console.log)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} ({blog.user.username}) {' '}
      <button style={hideOpen} onClick={toggleVisibility}>View</button>
      <button style={showOpen} onClick={toggleVisibility}>Hide</button>
      <div style={showOpen}>
        <ul>
          <li>{blog.url}</li>
          <li>likes: {blog.likes} <button onClick={likeThis}>like</button></li>
          <li>{blog.author}</li>
        </ul>
      </div>
    </div>  
  )
}

export default Blog