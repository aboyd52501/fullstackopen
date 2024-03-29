import { useContext } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { voteAnecdote } from '../requests'
import NotificationContext, { sendNotification } from '../NotificationContext'

const Anecdote = ({ anecdote }) => {

  const [, notificationDispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const voteSuccess = anec => {
    queryClient.invalidateQueries('anecdotes')
    sendNotification(`Liked ${anec.content}`, notificationDispatch)
  }

  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: voteSuccess
  })

  const handleVote = (anecdote) => {
    console.log('vote', anecdote.content)
    voteAnecdoteMutation.mutate(anecdote)
  }


  return (
    <div className='anecdoteItem'>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote