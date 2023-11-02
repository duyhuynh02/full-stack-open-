const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const sumOfLikes = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogs.reduce(sumOfLikes, 0);
};

const favoriteBlog = (blogs) => {
  const first_object = blogs[0];

  const blogsComparing = (first_obj, arr) => {
    let max_object = first_obj;
    const res = [first_obj];
    for (const obj of arr.slice(1)) {
      if (obj.likes > max_object.likes) {
        res[0] = obj;
        max_object = obj;
      }
    }
    return res;
  };

  const result_array = blogsComparing(first_object, blogs);
  const result = result_array[0];

  return {
    title: result.title,
    author: result.author,
    likes: result.likes,
  };
};

const mostBlogs = (blogs) => {
  //ex 4.6
  const occurenceList = blogs.map((blog) => blog.author);
  const count = _.countBy(occurenceList);
  let max_count = -1;
  let max_countAuthor = null;

  for (const [author, maxBlogs] of Object.entries(count)) {
    if (maxBlogs > max_count) {
      max_count = maxBlogs;
      max_countAuthor = author;
    }
  }
  return {
    author: max_countAuthor,
    blogs: max_count,
  };
};

const mostLikesAuthor = (blogs) => {
  //ex 4.7
  const listOfAuthors = _.groupBy(blogs, "author");
  let maxLikesAuthor = null;
  let maxLikes = -1;

  for (author in listOfAuthors) {
    const authorInfo = listOfAuthors[author];
    const maxResult = _.sumBy(authorInfo, "likes");
    if (maxResult > maxLikes) {
      maxLikes = maxResult;
      maxLikesAuthor = author;
    }
  }

  return {
    author: maxLikesAuthor,
    likes: maxLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikesAuthor,
};
