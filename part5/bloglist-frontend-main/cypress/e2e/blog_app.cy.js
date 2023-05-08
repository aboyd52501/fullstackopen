/* eslint-disable no-undef */
describe('Blog app', () => {

  beforeEach(() => {
    // Clear the DB
    cy.request('POST', 'http://localhost:3000/api/testing/reset')

    // Create a user
    const user = {
      username: 'testificate',
      name: 'Testificate Sr.',
      password: 'minecraft21'
    }
    cy.request('POST', 'http://localhost:3000/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('opens front page', () => {
    cy.contains('blogs')
  })

  it('shows login form', () => {
    // Find input labeled 'username:'
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('Login')
  })
})