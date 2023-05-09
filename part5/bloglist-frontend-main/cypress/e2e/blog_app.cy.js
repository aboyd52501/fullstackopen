/* eslint-disable no-undef */
describe('Blog app', () => {

  const user = {
    username: 'testificate',
    name: 'Testificate Sr.',
    password: 'minecraft21'
  }

  beforeEach(() => {
    // Clear the DB
    cy.request('POST', 'http://localhost:3000/api/testing/reset')

    // Create a user
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

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('input[id=username]')
        .type(user.username)
      cy.get('input[id=password]')
        .type(user.password)
      cy.contains('Login')
        .click()

      // See if the "Log Out" button appears
      cy.contains('Log out')
      cy.contains('logged in')
      cy.contains('Login successful')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', () => {
      cy.get('input[id=username]')
        .type('test')
      cy.get('input[id=password]')
        .type('invalid password')
      cy.contains('Login')
        .click()

      cy.contains('Login')
      cy.contains('username:')
      cy.contains('Invalid credentials')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      // Log in as testificate
      cy.get('input[id=username]')
        .type(user.username)
      cy.get('input[id=password]')
        .type(user.password)
      cy.contains('Login')
        .click()
    })

    it('user can create a new blog', () => {
      // Open the 'Add post' Toggleable input
      cy.contains('Add post')
        .click()

      // Fill out the form
      cy.contains('Title:')
        .type('blog1234')
      cy.contains('Author:')
        .type(user.name)
      cy.contains('Url:')
        .type('0000000000000000')
      cy.contains('Submit')
        .click()

      // Refresh the page
      cy.reload()

      // Check to see if the blog was added to the list
      cy.contains('blog1234')
      cy.contains('View')
    })
  })

  describe('When logged in and blog posts are added', () => {
    beforeEach(() => {
      cy.get('input[id=username]')
        .type(user.username)
      cy.get('input[id=password]')
        .type(user.password)
      cy.contains('Login')
        .click()

      cy.contains('Add post')
        .click()
      cy.contains('Title:')
        .type('blog1')
      cy.contains('Author:')
        .type(user.name)
      cy.contains('Url:')
        .type('blog::1')
      cy.contains('Submit')
        .click()

      cy.reload()
    })

    it('user can like a post', () => {
      cy.get('.blogShowButton')
        .eq(0) // Select just the first one we see
        .click()

      cy.get('.blogLikeButton')
        .click()

      cy.reload()
      cy.get('.blogShowButton')
        .eq(0) // Select just the first one we see
        .click()

      cy.contains('likes: 1')
    })
  })

})