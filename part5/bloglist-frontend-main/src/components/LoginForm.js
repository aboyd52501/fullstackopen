import { useState } from 'react'

const makeHandler = setFxn => e => setFxn(e.target.value)

const LoginForm = ({ submitLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsername = makeHandler(setUsername)
  const handlePassword = makeHandler(setPassword)

  const handleLogin = e => {
    e.preventDefault()

    const loginData = {
      username,
      password,
    }

    submitLogin(loginData)

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>username: </label>
          <input id='username' type='text' value={username} onChange={handleUsername} />
        </div>
        <div>
          <label htmlFor='password'>password: </label>
          <input id='password' type='password' value={password} onChange={handlePassword} />
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm