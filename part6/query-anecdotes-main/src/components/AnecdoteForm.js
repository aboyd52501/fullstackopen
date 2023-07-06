import { useMutation, useQueryClient } from 'react-query'
import { addAnecdote } from '../requests'
import NotificationContext, { sendNotification } from '../NotificationContext'
import { useContext } from 'react'

const AnecdoteForm = () => {

  const [, notificationDispatch] = useContext(NotificationContext)

  const submitSuccess = anec => {
    console.log('new anecdote', anec)
    queryClient.invalidateQueries('anecdotes')
    sendNotification(`Created new anecdote: ${anec.content}`, notificationDispatch)
  }

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(addAnecdote, {
    onSuccess: submitSuccess,
    onError: res => sendNotification('Error: ' + res.response.data.error, notificationDispatch)
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({
      content,
      id: Math.floor(Math.random() * 10000**2) % 10000,
      votes: 0
    })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
