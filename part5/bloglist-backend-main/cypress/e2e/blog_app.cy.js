const { PORT } = require('../../utils/config')

describe('Bloglist App', () => {
  it('front page can be opened', () => {
    cy.visit(`http://localhost:${PORT}`)
    cy.contains('blogs')
  })
})