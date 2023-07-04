import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from 'react-query'
import axios from 'axios'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const { data, isLoading, error } = useQuery(
    'anecdotes',
    () => axios.get('http://localhost:3001/anecdotes').then(res => res.data)
  )

  if (isLoading)
    return <div>Loading...</div>

  if (error)
    return <div>Anecdote service not available... Contact your administrator</div>

  const anecdotes = data

  return (
    <div className='appContainer'>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div className='anecdoteItem' key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
