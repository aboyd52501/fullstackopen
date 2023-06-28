import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const add = event => {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ''
    console.log('add', content)
    dispatch(addAnecdote(content))

    dispatch(addNotification(`You added "${content}"`))
    setTimeout(() => dispatch(removeNotification()), 5000)
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