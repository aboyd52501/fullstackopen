import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { queueNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    if (state.filter.length > 0)
      return state.anecdotes
        .filter(anec => anec.content.match(state.filter))
    else
      return state.anecdotes
  })

  const vote = anec => {
    dispatch(voteAnecdote(anec))
    dispatch(queueNotification(`You voted for "${anec.content}"`, 5000))
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