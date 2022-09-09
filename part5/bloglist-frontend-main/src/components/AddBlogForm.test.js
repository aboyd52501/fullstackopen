import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './AddBlogForm'

describe('<AddBlogForm />', () => {

  let mockSubmit
  let component
  let container

  beforeEach(async () => {
    mockSubmit = jest.fn()
    component = render(<AddBlogForm submitBlog={mockSubmit} />)
    container = component.container
  })

  test('calls the submitBlog callback with the supplied data',
    async () => {

      const titleInput = container.querySelector('.blogTitleInput')
      const authorInput = container.querySelector('.blogAuthorInput')
      const urlInput = container.querySelector('.blogUrlInput')
      const submitButton = container.querySelector('.blogSubmitButton')

      const title = '1234ALKSDJ'
      const author = 'JKLKIPPOI&NSLKJSDJ'
      const url = 'LKAJSODIUFIPOAMSE@($*&'

      const testSubmit = blogData => {
        expect(blogData.title).toBe(title)
        expect(blogData.author).toBe(author)
        expect(blogData.url).toBe(url)
      }

      userEvent.type(titleInput, title)
      userEvent.type(authorInput, author)
      userEvent.type(urlInput, url)
      userEvent.click(submitButton)

      mockSubmit.mock.calls.forEach(call => testSubmit(call[0]))

    }
  )

})