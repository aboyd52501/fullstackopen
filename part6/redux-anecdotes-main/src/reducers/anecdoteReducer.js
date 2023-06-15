const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  let stateOut = state
  switch (action.type) {
    case 'VOTE':
      const anecdoteTarget = state.find(anecdote => anecdote.id === action.id)
      const allOthers = state.filter(anecdote => anecdote.id !== action.id)
      stateOut = [
        ...allOthers,
        {
          content: anecdoteTarget.content,
          id: anecdoteTarget.id,
          votes: anecdoteTarget.votes + 1
        }
      ]
      break
    case 'ADD':
      const newAnecdote = asObject(action.content)
      stateOut = [...state, newAnecdote]
      break
    default:
      stateOut = state
  }

  console.log('state after: ', stateOut)
  stateOut.sort((x, y) => -x.votes + y.votes)
  return stateOut
}

export const voteAction = id => ({
  type: 'VOTE',
  id: id
})

export const addAction = content => ({
  type: 'ADD',
  content: content
})

export default reducer