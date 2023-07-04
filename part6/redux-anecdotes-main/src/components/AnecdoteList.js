import { useDispatch, useSelector, useStore } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import queueNotification from '../helpers/notificationManager'

const AnecdoteList = () => {

  const store = useStore()
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    if (state.filter.length > 0)
      return state.anecdotes
        .filter(anec => anec.content.match(state.filter))
    else
      return state.anecdotes
  })

  const vote = anec => {
    dispatch(voteAnecdote(anec.id))
    queueNotification(`You voted for "${anec.content}"`, store)
  }

  return anecdotes.map(anecdote =>
    <div className='anecdote' key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  )
}


export default AnecdoteList