import axios from 'axios'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const submitLogin = loginData => {
    axios
      .post('/api/login', loginData)
      .then(res => {
        const { data } = res;
        setUser(data)
        console.log(data)
      })
      .catch(err => {
        if (err.response.status === 401)
          alert('Invalid Credentials');
      });
  };

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} ({user.username}) logged in</p>
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
