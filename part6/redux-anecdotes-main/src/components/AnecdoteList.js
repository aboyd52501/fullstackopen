import { useDispatch, useSelector } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const vote = id => dispatch(voteAction(id))

  return anecdotes.map(anecdote =>
    <div className='anecdote' key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}


export default AnecdoteList