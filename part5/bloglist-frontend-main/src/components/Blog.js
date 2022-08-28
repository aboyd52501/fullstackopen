import { useState } from 'react'

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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} ({blog.user.username}) {' '}
      <button style={hideOpen} onClick={toggleVisibility}>View</button>
      <button style={showOpen} onClick={toggleVisibility}>Hide</button>
      <div style={showOpen}>
        <ul>
          <li>{blog.url}</li>
          <li>likes: {blog.likes} <button>like</button></li>
          <li>{blog.author}</li>
        </ul>
      </div>
    </div>  
  )
}

export default Blog