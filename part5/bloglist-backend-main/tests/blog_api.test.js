/*
This file contains test cases for the blog REST API. It sets up a supertest instance of the server, defines utility functions for API calls, and sets up a fresh test database with initial data before each test case. 

The file begins by defining variables for use throughout the test suite, such as a BASE_URL for convenience, and a sessionJWT and authString obtained by creating a user and logging them in.

It then defines a beforeEach block that clears the database and adds a set of initial blog documents to the database using Promise.all to ensure all saves are finished before moving on. There are also alternative methods of creating the initial blog documents that were used during development. 

The bulk of the test cases are defined in a describe block that focuses on the behavior of the API when interacting with blogs. It tests GET, POST, PUT, and DELETE requests, ensuring that the API returns the appropriate response codes and formats, handles errors and invalid input correctly, and correctly modifies or retrieves data from the database. 

The test cases include:
- Ensuring that GET requests to /api/blogs return all blogs in the database, in the correct format, and only the blogs that were added initially. It also tests GET requests to retrieve a specific blog, checking that a valid ID returns the correct blog, and that invalid IDs return the appropriate error status codes. 
- Testing that new blogs can be added with valid data and with a valid sessionJWT. It also checks that attempting to add a blog with invalid data or with an invalid or missing sessionJWT returns the appropriate error status codes.
- Checking deleting blogs with DELETE requests, testing that a blog can be deleted with a valid ID and sessionJWT, and that attempting to delete a blog with an invalid ID, an invalid or missing sessionJWT, or with a sessionJWT belonging to another user returns the appropriate error status codes. 
- Checking modifying existing blogs with PUT requests, ensuring that a blog can be modified with valid data and that the changes are saved to the database. It also tests that attempting to modify a blog with invalid data returns the appropriate error status code. 
*/
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const {
  initialBlogs,
  initialUsers,
  blogsInDb,
  nonExistingId,
} = require('./test_helper');

// We are creating a supertest instance of the backend REST API server.
const api = supertest(app);

// for convenience
const BASE_URL = '/api/blogs';
const idUrl = (id) => `${BASE_URL}/${id}`;
const getAllBlogs = () => api.get(BASE_URL);

/*
This block of code sets up the test environment by deleting all existing users, creating a new user with the initial user data,
logging the user in to obtain a session JWT, and storing the JWT and authorization string for use in subsequent tests.
The session JWT is used to authenticate the user when sending requests to protected endpoints.
*/
let sessionJWT = null;
let authString = null;
let authorId = null;
beforeAll(async () => {
  await User.deleteMany();
  const userRes = await api
    .post('/api/users')
    .send(initialUsers[0])
    .expect(201)
    .expect('Content-Type', /application\/json/);

  authorId = userRes.body.id;

  const { username, password } = initialUsers[0];
  const loginRes = await api
    .post('/api/login')
    .send({ username, password })
    .expect(200)
    .expect('Content-Type', /application\/json/);
  const { token } = loginRes.body;

  sessionJWT = token;
  authString = `bearer ${token}`;
});

/*
This code block is used to setup a fresh database with initial blog data before each test case. It does this by first deleting all existing blogs, then creating a new set of blog documents based on the initialBlogs array, using the authorId previously obtained from creating a user. These new blog documents are then saved to the database using Promise.all to ensure they all finish before moving on. There are also commented out alternative methods of creating the initial blog documents that were used during development.
*/
beforeEach(async () => {
  await Blog.deleteMany();
  const initialBlogDocuments = initialBlogs.map((data) => (
    new Blog({
      user: authorId,
      ...data,
    })
  ));
  const promiseArray = initialBlogDocuments.map((blog) => blog.save());
  await Promise.all(promiseArray);
  // await Blog.deleteMany({});
  // let blogObject = new Blog(initialBlogs[0]);
  // await blogObject.save();
  // blogObject = new Blog(initialBlogs[1]);
  // await blogObject.save();
});

/*
This block of tests focuses on the behavior of the API when interacting with blogs. It tests GET, POST, PUT, and DELETE requests, ensuring that the API returns the appropriate response codes and formats, handles errors and invalid input correctly, and correctly modifies or retrieves data from the database. 

It first sets up the environment by clearing the database, adding some initial blogs, and logging in a user to obtain a sessionJWT and authorId. 

The first set of tests checks that GET requests to /api/blogs return all blogs in the database, in the correct format, and only the blogs that were added initially. It then tests GET requests to retrieve a specific blog, checking that a valid ID returns the correct blog, and that invalid IDs return the appropriate error status codes. 

The next set of tests focus on adding new blogs with POST requests. It tests that new blogs can be added with valid data and with a valid sessionJWT. It also checks that attempting to add a blog with invalid data or with an invalid or missing sessionJWT returns the appropriate error status codes.

The next set of tests checks deleting blogs with DELETE requests, testing that a blog can be deleted with a valid ID and sessionJWT, and that attempting to delete a blog with an invalid ID, an invalid or missing sessionJWT, or with a sessionJWT belonging to another user returns the appropriate error status codes. 

The final set of tests checks modifying existing blogs with PUT requests, ensuring that a blog can be modified with valid data and that the changes are saved to the database. It also tests that attempting to modify a blog with invalid data returns the appropriate error status code. 

*/
describe('when some blogs are initially saved', () => {
  test('blogs are returned as json', async () => {
    await getAllBlogs()
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await getAllBlogs();
    expect(response.body.length).toBe(initialBlogs.length);
  });

  test('exactly what is saved is returned', async () => {
    const blogsAtStart = await blogsInDb();
    const responseBlogs = (await getAllBlogs()).body;
    responseBlogs.forEach((x, i, arr) => {
      arr[i].user = x.user.id; // eslint-disable-line no-param-reassign
    });
    expect(responseBlogs).toEqual(blogsAtStart);
  });

  describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await blogsInDb();
      const targetBlog = blogsAtStart[0];
      const response = await api
        .get(idUrl(targetBlog.id))
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toEqual(targetBlog);
    });

    test('fails with code 404 with a valid but unused id', async () => {
      const id = await nonExistingId();
      await api
        .get(idUrl(id))
        .expect(404);
    });

    test('fails with status code 400 with an invalid id', async () => {
      const id = ')@(*@#@!#';
      await api
        .get(idUrl(id))
        .expect(400);
    });
  });

  describe('addition of a new blog', () => {
    test('succceeds with status code 201 with valid data', async () => {
      const newBlog = {
        url: 'hello',
        author: 'hi',
        title: 'hello world',
        likes: 1233214,
      };

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${sessionJWT}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAfter = await blogsInDb();
      expect(blogsAfter).toContainEqual(response.body);
    });

    test('fails with status code 400 if data is invalid but token is valid', async () => {
      const newBlog = {
        author: 'jeff',
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${sessionJWT}`)
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });

    test('fails with status code 401 if data is valid but token is invalid', async () => {
      const newBlog = {
        url: 'hello',
        author: 'hi',
        title: 'hello world',
        likes: 1233214,
      };

      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer badtokenUhOhStinky')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/);
    });

    test('fails with status code 401 if data is valid but no token supplied', async () => {
      const newBlog = {
        url: 'hello',
        author: 'hi',
        title: 'hello world',
        likes: 1233214,
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/);
    });
  });

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid and token is valid', async () => {
      const blogsBefore = await blogsInDb();
      const blogToDelete = blogsBefore[0];

      await api
        .delete(idUrl(blogToDelete.id))
        .set('Authorization', authString)
        .expect(204);

      const blogsAfter = await blogsInDb();
      expect(blogsAfter).toHaveLength(blogsBefore.length - 1);
      const ids = blogsAfter.map((blog) => blog.id);
      expect(ids).not.toContain(blogToDelete.id);
    });

    test('fails with status code 400 if id is invalid and token is valid', async () => {
      const badId = '(A*S)(&';
      await api
        .delete(idUrl(badId))
        .set('Authorization', authString)
        .expect(400);
    });

    test('fails with status code 400 if token is invalid', async () => {
      const blogsBefore = await blogsInDb();
      const blogToDelete = blogsBefore[0];

      await api
        .delete(idUrl(blogToDelete.id))
        .expect(400);
    });

    test('fails with status code 401 if token is for another user', async () => {
      const wrongUser = {
        username: 'hellokitty',
        password: '1234abcd',
      };

      await api
        .post('/api/users')
        .send(wrongUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const { token } = (await api.post('/api/login').send(wrongUser)).body;

      const blogsBefore = await blogsInDb();
      const blogToDelete = blogsBefore[0];

      await api
        .delete(idUrl(blogToDelete.id))
        .set('Authorization', `bearer ${token}`)
        .expect(401)
        .expect('Content-Type', /application\/json/);

      expect(await blogsInDb()).toEqual(blogsBefore);
    });
  });

  describe('modification of a blog', () => {
    test('succeeds with valid data', async () => {
      const blogsBefore = await blogsInDb();
      const blogToUpdate = { ...blogsBefore[0] };
      blogToUpdate.author = 'markiplier';
      blogToUpdate.likes = -1;

      const response = await api
        .put(idUrl(blogToUpdate.id))
        .send(blogToUpdate)
        .expect(200);

      const updatedBlog = response.body;
      expect(updatedBlog).toEqual(blogToUpdate);
      const blogsAfter = await blogsInDb();
      expect(blogsAfter).toHaveLength(blogsBefore.length);
      const found = blogsAfter.find((blog) => blog.id === blogToUpdate.id);
      expect(found).toBeTruthy();
    });

    test('fails with status code 400 with invalid data', async () => {
      const blogsBefore = await blogsInDb();
      const blogToUpdate = { ...blogsBefore[0] };
      blogToUpdate.author = true;
      blogToUpdate.url = 27840;
      blogToUpdate.likes = 'Hello world';

      await api
        .put(idUrl(blogToUpdate.id))
        .send(blogToUpdate)
        .expect(400);

      const blogsAfter = await blogsInDb();
      expect(blogsAfter).toEqual(blogsBefore);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
