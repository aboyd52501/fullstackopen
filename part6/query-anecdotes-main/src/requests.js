import axios from 'axios'

const BASE_URL = 'http://localhost:3001/anecdotes'
const idUrl = id => `${BASE_URL}/${id}`

export const getAnecdotes = () =>
  axios.get(BASE_URL).then(res => res.data)

export const addAnecdote = anecdote => 
  axios.post(BASE_URL, anecdote).then(res => res.data)

export const voteAnecdote = async ({ id }) => {
  const thisUrl = idUrl(id)
  const currentState = await axios.get(thisUrl).then(res => res.data)
  return axios.put(thisUrl, {...currentState, votes: currentState.votes + 1}).then(res => res.data)
}