import { useState } from 'react'
import {
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'
import { useField } from './hooks/App'
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'

const Notification = ({ content }) => {
  if (!content)
    return

  return <Alert>{content}</Alert>
}

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (

    <Navbar collapseOnSlect expand='lg'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/'>Home</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/anecdotes'>Anecdotes</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/create'>Create new</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/about'>About</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    // <div>
    //   <Link to='/anecdotes' style={padding}>anecdotes</Link>
    //   <Link to='/create' style={padding}>create new</Link>
    //   <Link to='/about' style={padding}>about</Link>
    // </div>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anec = anecdotes.find(a => a.id === Number(id))
  return (
    <div>
      <h3>
        {anec.content}
      </h3>
      <i>{anec.author}</i>
      <br />
      <i>{anec.info}</i>
    </div>
  )
  }

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map(anecdote => (
          <tr key={anecdote.id}>
            <td>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </td>
            <td>
              <p>{anecdote.author}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div style={{
    bottom: 0,
    position: 'absolute',
    padding: 8
  }}>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const [contentField, contentReset] = useField()
  const [authorField, authorReset] = useField()
  const [infoField, infoReset] = useField()

  const resetAll = () => {
    [
      contentReset,
      authorReset,
      infoReset
    ].forEach(func => func())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: contentField.value,
      author: authorField.value,
      info: infoField.value,
      votes: 0
    })
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Label>
          content
        </Form.Label>
        <Form.Control
          type='text'
          name='content'
          {...contentField}
        />
        <Form.Label>
          author
        </Form.Label>
        <Form.Control
          type='text'
          name='author'
          {...authorField}
        />
        <Form.Label>
          url for more info
        </Form.Label>
        <Form.Control
          type='text'
          mame='info'
          {...infoField}
        />
        <Button type='submit'>create</Button>
        <Button type='button' onClick={resetAll}>Reset </Button>
      </Form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  const nav = useNavigate()

  const showNotification = content => {
    setNotification(content)
    setTimeout(() => setNotification(''), 5000)
  }

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    nav('/anecdotes')
    showNotification(`Added new: ${anecdote.content}`)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div className='container'>
      <Notification content={notification} />
      <h1>Software anecdotes</h1>
      <Menu />
      
      <Routes>
        <Route path='/anecdotes' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes} />} />
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<CreateNew addNew={addNew} />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
