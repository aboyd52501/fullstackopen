import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, failNotif, successNotif }) => {

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
      .then(() => successNotif(`Liked ${blog.title}`))
      .catch(() => failNotif(`Failed to like ${blog.title}: ${e.message}`))
  }

  const deleteThis = () => {
    if (!window.confirm(`Remove ${blog.title}?`)) return
    blogService
      .del(blog)
      .then(() => successNotif(`Deleted ${blog.title}`))
      .catch(e => failNotif(`Failed to delete ${blog.title}: ${e.message}`))
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
        <button onClick={deleteThis}>Delete</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog