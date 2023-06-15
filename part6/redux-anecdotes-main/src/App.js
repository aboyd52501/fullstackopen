import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const voteAction = id => ({
    type: 'VOTE',
    id: id
  })

  const addAction = content => ({
    type: 'ADD',
    content: content
  })

  const vote = id => {
    console.log('vote', id)
    dispatch(voteAction(id))
  }

  const add = event => {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ''
    console.log('add', content)
    dispatch(addAction(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name='content' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App