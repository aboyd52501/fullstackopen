import { useSelector, useDispatch } from 'react-redux'
import { voteAction, addAction } from './reducers/anecdoteReducer'
import './App.css'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = id => {
    console.log('vote', id)
    dispatch(voteAction(id))
  }


  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div className='anecdote' key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm />
    </div>
  )
}

export default App