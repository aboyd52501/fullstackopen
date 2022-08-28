/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseUrl = '/api/blogs'
const blogUrl = id => `${baseUrl}/${id}`

let token = null;
const authHeader = () => `bearer ${token}`

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = newToken => token = newToken

const create = blog => {
  const config = {
    headers: { Authorization: authHeader() },
  }

  return axios
    .post(baseUrl, blog, config)
    .then(response => response.data)
}

const like = blog => {
  return axios
    .put(
      blogUrl(blog.id),
      { likes: blog.likes + 1 }
    )
    .then(response => response.data)
}

export default { getAll, setToken, create, like }