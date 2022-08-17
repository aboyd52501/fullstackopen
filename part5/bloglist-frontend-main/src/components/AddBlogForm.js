import { useState } from 'react'

const makeHandler = setter => e => setter(e.target.value)

const AddBlogForm = ({ submitBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitle = makeHandler(setTitle)
  const handleAuthor = makeHandler(setAuthor)
  const handleUrl = makeHandler(setUrl)

  const handleSubmit = e => {
    e.preventDefault()

    submitBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor='title'>Title: </label>
          <input
            type='text' id='title'
            value={title} onChange={handleTitle}
          />
        </div>
        <div>
          <label htmlFor='author'>Author: </label>
          <input
            type='text' id='author'
            value={author} onChange={handleAuthor}
          />
        </div>
        <div>
          <label htmlFor='url'>Url: </label>
          <input
            type='text' id='url'
            value={url} onChange={handleUrl}
          />
        </div>
        <input type='submit' value='Submit' />
      </form>
    </div>
  )
};

export default AddBlogForm