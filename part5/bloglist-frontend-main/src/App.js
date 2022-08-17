import axios from 'axios'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import blogService from './services/blogs'

const SESSION_STORAGE_KEY = 'react-app-login-info'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    
    const savedCreds = localStorage.getItem(SESSION_STORAGE_KEY)
    if (savedCreds)
      login(JSON.parse(savedCreds))
  }, [])

  const submitLogin = loginData => {
    axios
      .post('/api/login', loginData)
      .then(res => {
        login(res.data)
      })
      .catch(err => {
        if (err.response.status === 401)
          alert('Invalid Credentials')
      });
  };


  const login = user => {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user))
    setUser(user)
    blogService.setToken(user.token)
    console.log(user)
  }

  const logout = e => {
    localStorage.removeItem(SESSION_STORAGE_KEY)
    setUser(null)
  }

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} ({user.username}) logged in</p>
        <button onClick={logout}>Log out</button>
        <br />
        <AddBlogForm submitBlog={blogService.create}/>
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
        <LoginForm submitLogin={submitLogin}/>
      </div>
    )
  }
}

export default App
