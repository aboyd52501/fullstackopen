/*
  This file contains utility functions for manipulating a list of blog objects.
  The function `dummy` returns 1.
  The function `totalLikes` takes an array of blog objects and returns the sum of their 'likes' properties.
  The function `favoriteBlog` takes an array of blog objects and returns the object with the highest 'likes' property.
  The function `mostBlogs` takes an array of blog objects and returns an object containing the author with the most blogs and the number of their blogs.
  The function `mostLikes` takes an array of blog objects and returns an object containing the author with the most total likes and the number of their likes.
*/

const dummy = () => 1;

const totalLikes = (blogs) => (
  blogs.reduce((acc, x) => acc + x.likes, 0)
);

const favoriteBlog = (blogs) => (
  blogs.reduce((fav, x) => (
    x.likes > fav.likes ? x : fav
  ))
);

const mostBlogs = (blogs) => {
  const count = {};
  blogs.forEach((blog) => {
    count[blog.author] = (count[blog.author] || 0) + 1;
  });

  const mostBlogsAuthor = Object.entries(count).reduce((most, x) => (
    most[1] < x[1] ? x : most
  ));

  return {
    author: mostBlogsAuthor[0],
    blogs: mostBlogsAuthor[1],
  };
};

const mostLikes = (blogs) => {
  const count = {};
  blogs.forEach((blog) => {
    count[blog.author] = (count[blog.author] || 0) + blog.likes;
  });

  const mostLikesAuthor = Object.entries(count).reduce((most, x) => (
    most[1] < x[1] ? x : most
  ));

  return {
    author: mostLikesAuthor[0],
    likes: mostLikesAuthor[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
