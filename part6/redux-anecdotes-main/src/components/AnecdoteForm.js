import { useDispatch } from 'react-redux'
import { addAction } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const add = event => {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ''
    console.log('add', content)
    dispatch(addAction(content))
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