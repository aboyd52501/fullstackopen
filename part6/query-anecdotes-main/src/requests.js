import axios from 'axios'

const BASE_URL = 'http://localhost:3001/anecdotes'
const idUrl = id => `${BASE_URL}/${id}`

export const getAnecdotes = () =>
  axios.get(BASE_URL).then(res => res.data)

export const addAnecdote = anecdote => 
  axios.post(BASE_URL, anecdote).then(res => res.data)

// First fetches the state of the anecdote from the server, to prevent spoofing.
// I'm not sure if I need to do this, because React Query automatically synchronizes the state. I think it's possible to spoof, however, so I will.
export const voteAnecdote = async ({ id }) => {
  const thisUrl = idUrl(id)
  const currentState = await axios.get(thisUrl).then(res => res.data)
  return axios.put(thisUrl, {...currentState, votes: currentState.votes + 1})
}