import { useMutation, useQueryClient } from 'react-query'
import { addAnecdote } from '../requests'
import NotificationContext from '../NotificationContext'
import { useContext } from 'react'

const AnecdoteForm = () => {

  const [, notificationDispatch] = useContext(NotificationContext)
  const sendNotification = content => {
    notificationDispatch({type: 'SET', payload: content})
    setTimeout(() => notificationDispatch({type: 'REMOVE'}), 5000) 
  }

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(addAnecdote, {
    onSuccess: () => queryClient.invalidateQueries('anecdotes')
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote', content)
    newAnecdoteMutation.mutate({
      content,
      id: Math.floor(Math.random() * 10000**2) % 10000,
      votes: 0
    })
    sendNotification(`Created new anecdote: ${content}`)
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
