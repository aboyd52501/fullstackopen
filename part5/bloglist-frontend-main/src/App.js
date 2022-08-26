import axios from 'axios'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
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
    blogService.getAll().then(blogs =>
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

  const submitBlog = (...args) => {
    blogService.create(...args)
    .then(() => successNotify('Successfully added blog'))
    .catch((e) => failNotify(`Failed to add blog: ${e.response.data.error}`))
  }

  if (user) {
    return (
      <div>
        <Notification notification={notification} />
        <h2>blogs</h2>
        <p>{user.name} ({user.username}) logged in</p>
        <button onClick={logout}>Log out</button>
        <br />
        <AddBlogForm submitBlog={submitBlog}/>
        <br />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
  else {
    return (
      <div>
        <Notification notification={notification} />
        <LoginForm submitLogin={submitLogin}/>
      </div>
    )
  }
}

export default App
