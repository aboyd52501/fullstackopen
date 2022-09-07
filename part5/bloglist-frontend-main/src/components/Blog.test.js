import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
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

  let container;

  beforeEach(() => {
    container = render(<Blog blog={testBlog} />).container
  })

  test('Renders only title and author by default, not likes and url',
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

})