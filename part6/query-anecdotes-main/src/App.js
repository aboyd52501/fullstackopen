import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Anecdote from './components/Anecdote'
import { useQuery } from 'react-query'
import { getAnecdotes } from './requests'

const App = () => {

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
    
      {anecdotes.map(anec => <Anecdote key={anec.id} anecdote={anec}/>)}
    </div>
  )
}

export default App
