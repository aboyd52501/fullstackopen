import { useDispatch, useStore } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import queueNotification from '../helpers/notificationManager'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

  const store = useStore()
  const dispatch = useDispatch()

  const add = async event => {
    event.preventDefault()
    
    const content = event.target.content.value
    event.target.content.value = ''
    console.log('add', content)

    const data = await anecdoteService.add(content)

    console.log(data)
    dispatch(appendAnecdote(data))


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