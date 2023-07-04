import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, voteAnecdote } from './requests'

const App = () => {

  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: () => queryClient.invalidateQueries('anecdotes')
  })

  const handleVote = (anecdote) => {
    console.log('vote', anecdote.content)
    voteAnecdoteMutation.mutate(anecdote)
  }

  const { data, isLoading, error } = useQuery('anecdotes', getAnecdotes)

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
