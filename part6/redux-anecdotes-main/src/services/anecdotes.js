import axios from 'axios'
import { asObject } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const formatUrl = id => `${baseUrl}/${id}`

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const get = async id => {
  const res = await axios.get(formatUrl(id))
  return res.data
}

const add = async content => {
  return await axios
    .post(baseUrl, asObject(content))
    .then(res => res.data)
}

const vote = async id => {
  const anec = await get(id)
  const newAnec = { ...anec, votes: anec.votes + 1 }
  return await axios
    .put(`${baseUrl}/${id}`, newAnec)
}

export default { getAll, add, vote }