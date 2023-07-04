import axios from 'axios'
import { asObject } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const add = async content => {
  return await axios
    .post(baseUrl, asObject(content))
    .then(res => res.data)
}

export default { getAll, add }