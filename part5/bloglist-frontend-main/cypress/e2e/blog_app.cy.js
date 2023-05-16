/* eslint-disable no-undef */

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request({
    url: 'http://localhost:3000/api/login',
    method: 'POST',
    body: { username, password }
  })
    .then( res => {
      localStorage.setItem('react-app-login-info', JSON.stringify(res.body))
      cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: 'http://localhost:3000/api/blogs',
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('react-app-login-info')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})

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
      // cy.get('input[id=username]')
      //   .type(user.username)
      // cy.get('input[id=password]')
      //   .type(user.password)
      // cy.contains('Login')
      //   .click()
      cy.login({ username: user.username, password: user.password })
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
      // cy.get('input[id=username]')
      //   .type(user.username)
      // cy.get('input[id=password]')
      //   .type(user.password)
      // cy.contains('Login')
      //   .click()

      cy.login({ username: user.username, password: user.password })

      cy.createBlog({
        title: 'blog1',
        author: user.name,
        url: 'blog::1',
        likes: 0
      })

      cy.createBlog({
        title: 'blog2',
        author: user.name,
        url: 'blog::2',
        likes: 1
      })

      cy.createBlog({
        title: 'blog3',
        author: user.name,
        url: 'blog::3',
        likes: 2
      })

      cy.createBlog({
        title: 'blog4',
        author: user.name,
        url: 'blog::4',
        likes: 4
      })

      cy.createBlog({
        title: 'blog5',
        author: user.name,
        url: 'blog::5',
        likes: 8
      })

      cy.reload()
    })

    it('user can like a post', () => {

      const blogName = 'blog4'

      const getBlogDiv = () => cy.contains(blogName).parent()

      getBlogDiv()
        .find('button.blogShowButton')
        .click()

      getBlogDiv()
        .find('.blogLikes')
        .then($li => {
          const beforeLikes = parseInt($li.text().replace(/\D/g,''))
          return beforeLikes
        })
        .then(beforeLikes => {
          getBlogDiv()
            .find('button.blogLikeButton')
            .click()

          cy.reload()

          getBlogDiv()
            .find('button.blogShowButton')
            .click()

          getBlogDiv()
            .find('.blogLikes')
            .should($li => {
              const afterLikes = parseInt($li.text().replace(/\D/g,''))
              expect(afterLikes).to.eq(beforeLikes+1)
            })
        })
      // // Get the post we want to track
      // cy.get('.blogTitle').eq(0).then($blogTitle => {
      //   const blogTitle = $blogTitle.text()
      //   const getBlogDiv = () => cy.contains(blogTitle).parent()

      //   getBlogDiv()
      //     .find('button.blogShowButton')
      //     .click()

      //   const $blogLikes = getBlogDiv()
      //     .find('.blogLikes')
      //   cy.log($blogLikes)
      //   const blogLikesText = $blogLikes.text()
      //   const likes = parseFloat(blogLikesText.replace(/[^0-9]/g, ''))
      //   cy.log(likes)
      // })

      // cy.get('.blogShowButton')
      //   .eq(0) // Select just the first one we see
      //   .click()

      // cy.get('.blogLikeButton')
      //   .eq(0)
      //   .click()

      // cy.reload()
      // cy.get('.blogShowButton')
      //   .eq(0) // Select just the first one we see
      //   .click()

      cy.contains('likes: 1')
    })

    it('user can delete own blog', () => {

      const blogName = 'blog3'
      const getBlogDiv = () => cy.contains(blogName).parent()

      cy.get('body')
        .should('contain', blogName)

      getBlogDiv().find('button.blogShowButton')
        .click()

      getBlogDiv().find('button.blogDeleteButton')
        .click()

      cy.reload()

      cy.get('body')
        .should('not.contain', blogName)

      cy.get('body')
        .should('contain', 'blog1')
    })

    it('only author can see delete button of a blog', () => {

      cy.get('button.logoutButton')
        .click()

      cy.reload()

      const blogName = 'blog1'
      cy.contains(blogName)
        .parent()
        .find('button.blogShowButton')
        .click()

      cy.contains(blogName)
        .parent()
        .should('not.contain', 'button', 'Delete')

    })
  })

})