import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

  const testBlog = {
    title: 'Test Blog #1',
    author: 'XYZ',
    url: 'hello.world',
    likes: 20,
    user: {
      username: 'xyz',
      name: 'XYZ',
    },
  }

  let component
  let container
  let mockLike

  beforeEach(() => {
    mockLike = jest.fn()
    component = render(<Blog blog={testBlog} likeCallback={mockLike}/>)
    container = component.container
  })

  test('renders only title and author by default, not likes and url',
    () => {

      expect(container).toHaveTextContent(testBlog.title)
      expect(container).toHaveTextContent(testBlog.author)
      // screen.getByText(testBlog.title) // Verifies title displays
      // screen.getAllByText(testBlog.author) // Verifies author displays

      const toggleableDiv = container.querySelector('.toggleableContent')
      expect(toggleableDiv).toHaveStyle('display: none')
      // screen.debug()
    }
  )

  test('clicking the show button calls the event handler exactly once',
    async () => {
      const botonMostrar = container.querySelector('.blogShowButton')
      const user = userEvent.setup()
      await user.click(botonMostrar)

      const toggleableDiv = container.querySelector('.toggleableContent')
      expect(toggleableDiv).not.toHaveStyle('display: none')

      expect(container).toHaveTextContent(testBlog.url)
      expect(container).toHaveTextContent(testBlog.likes)
    })

  test('like function is called twice when like button is pressed twice',
    async () => {
      const botonMostrar = container.querySelector('.blogShowButton')
      const user = userEvent.setup()
      await user.click(botonMostrar)

      const botonGustar = container.querySelector('.blogLikeButton')
      expect(mockLike.mock.calls).toHaveLength(0)

      await user.click(botonGustar)
      await user.click(botonGustar)

      expect(mockLike.mock.calls).toHaveLength(2)

    })

})