import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, failNotif, successNotif, likeCallback, loginUser }) => {

  const blogStyle = {
    margin: '8px 0',
    border: '1px solid',
    padding: '8px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '8px',
    backgroundColor: 'white',
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#333333',
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

  likeCallback = likeCallback || likeThis

  const username = blog.user ? blog.user.username : 'Anonymous'

  const showDelStyle = {
    display: (loginUser && blog.user && loginUser.username === blog.user.username) ? '' : 'none'
  }


  return (
    <div style={blogStyle} className='blog'>
      <h3
        className='blogTitle'
      >{blog.title}</h3>
      <div>
        <p>{blog.author}</p>
        <p>({username})</p>
      </div>
      <button
        style={hideOpen}
        onClick={toggleVisibility}
        className='blogShowButton'
      >View</button>
      <button
        style={showOpen}
        onClick={toggleVisibility}
        className='blogHideButton'
      >Hide</button>
      <div style={showOpen} className='toggleableContent'>
        <ul>
          <li>{blog.url}</li>
          <li
            className='blogLikes'
          >likes: {blog.likes}
          </li>
          <li>{blog.author}</li>
        </ul>
        <button
          onClick={likeCallback}
          className='blogLikeButton'
        >like</button>
        <button
          onClick={deleteThis}
          className = 'blogDeleteButton'
          style={showDelStyle}
        >Delete</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog