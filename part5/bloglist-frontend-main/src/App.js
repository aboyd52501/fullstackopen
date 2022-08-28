import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'

const SESSION_STORAGE_KEY = 'react-app-login-info'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs( blogs )
      )
    
    const savedCreds = localStorage.getItem(SESSION_STORAGE_KEY)
    if (savedCreds)
      login(JSON.parse(savedCreds))
  }, [])


  const displayNotification = (message, color) => {
    setNotification({message, color});
    setTimeout(() => {
      setNotification(null);
    }, 3000)
  }

  const failNotify = (message) => displayNotification(message, 'red');
  const successNotify = (message) => displayNotification(message, 'green');

  const submitLogin = loginData => {
    axios
      .post('/api/login', loginData)
      .then(res => {
        login(res.data)
        successNotify(`Login successful`)
      })
      .catch(err => {
        if (err.response.status === 401)
          failNotify('Invalid credentials')
      });
  };
  
  const login = user => {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user))
    setUser(user)
    blogService.setToken(user.token)
    console.log(user)
  }

  const logout = e => {
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY)
      setUser(null)
      successNotify('Logged out successfuly');
    }
    catch (e) {
      failNotify(`Logout failed: ${e}`);
    }
  }

  const blogToggleableRef = useRef()

  const submitBlog = (blog) => {
    blogService
      .create(blog)
      .then(() => {
        successNotify('Successfully added blog')
        blogToggleableRef.current.toggleVisibility()
      })
      .catch((e) => failNotify(`Failed to add blog: ${e.response.data.error}`))
  }

  return (
    <div>
      <Notification notification={notification} />
      <h2>blogs</h2>

      {user ?
        <div>
          <p>{user.name} ({user.username}) logged in <button onClick={logout}>Log out</button></p>
          <Toggleable openLabel='Add post' ref={blogToggleableRef}>
            <AddBlogForm submitBlog={submitBlog}/>
          </Toggleable>
        </div>
        :
        <LoginForm submitLogin={submitLogin}/>
      }

      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
