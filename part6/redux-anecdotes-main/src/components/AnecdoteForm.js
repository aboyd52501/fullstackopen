import { useDispatch, useStore } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import queueNotification from '../helpers/notificationManager'

const AnecdoteForm = () => {

  const store = useStore()
  const dispatch = useDispatch()

  const add = event => {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ''
    console.log('add', content)
    dispatch(addAnecdote(content))

    queueNotification(`You added "${content}"`, store)
  }

  return (
    <div className='AnecdoteForm'>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name='content' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm