/*
This file contains tests related to user creation, and specifically focuses on the scenario where there is initially one user in the database. 

It uses the supertest library for making HTTP requests to the API, and bcrypt for hashing passwords. It also imports the mongoose library and User model from the app, as well as the usersInDb function from the test_helper file.

The tests in this file include: 
- Retrieving users from the handle /
- Successfully creating a new user with a fresh username
- Failing to create a new user when the username is already taken
- Failing to create a new user when the username or password is too short

This file also includes an afterAll function to close the mongoose connection after all tests have finished running.
*/
const supertest = require('supertest');

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');
const { usersInDb } = require('./test_helper');

const app = require('../app');

const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany();

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('we are able to retrieve the user(s) from the handle /', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  describe('user creation', () => {
    test('succeeds with a fresh username', async () => {
      const usersBefore = await usersInDb();

      const newUser = {
        username: 'dwaynej',
        name: 'Dwayne Johnson',
        password: 'thecrock587',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const usersAfter = await usersInDb();
      expect(usersAfter).toHaveLength(usersBefore.length + 1);
    });

    test('fails with code 400 and message if username is taken', async () => {
      const usersBefore = await usersInDb();

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'laksdjflk',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain('username must be unique');
      // const usersAfter = await usersInDb();
      expect(await usersInDb()).toEqual(usersBefore);
    });

    test('fails with code 400 and message if username or password is too short', async () => {
      const usersBefore = await usersInDb();

      const shortPassUser = {
        username: 'jeffshortpass',
        password: '12',
      };

      const shortNameUser = {
        username: 'a',
        password: 'pneumonoultramicroscopicsilicovolcanoconiosis',
      };

      await api
        .post('/api/users')
        .send(shortPassUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      await api
        .post('/api/users')
        .send(shortNameUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(await usersInDb()).toEqual(usersBefore);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
