import { useState, useEffect } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, handleLikes }) => {
  const [blogDetailVisible, setblogDetailVisible] = useState(false);
  const [blogLikes, setBlogLikes] = useState(blog.likes + 1); //to make sure the state is catching up
  const hideBlogDetailWhenVisible = {
    display: blogDetailVisible ? "none" : "",
  };
  const showBlogDetailWhenVisible = {
    display: blogDetailVisible ? "" : "none",
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleBlogLikes = () => {
    setBlogLikes(blogLikes + 1);
    return blogLikes;
  };

  const handleLikesAndUpdate = () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: handleBlogLikes(),
      user: blog.user,
      id: blog.id,
    };

    handleLikes(newBlog);
  };

  const removeBlog = () => {
    if (window.confirm("Do you really want to delete this post?")) {
      blogService.remove(blog);
    }
  };

  const SetHideBlockDetailVisible = () => {
    setblogDetailVisible(true);
  };

  const SetShowBlockDetailVisible = () => {
    setblogDetailVisible(false);
  };

  return (
    <div className="allBlog">
      <div style={hideBlogDetailWhenVisible}>
        {blog.title} {blog.author}
        <button
          id="show-detail"
          onClick={SetHideBlockDetailVisible}
          className="showDetail"
        >
          show detail
        </button>
      </div>

      <div style={showBlogDetailWhenVisible}>
        <div style={blogStyle} className="blog">
          <div>
            {blog.title} {blog.author}
          </div>
          <div>{blog.url}</div>
          <div>
            {blogLikes}
            <button className="likes" onClick={handleLikesAndUpdate}>
              likes
            </button>
          </div>
          <div>{blog.user.username}</div>
          <button id="remove" onClick={removeBlog}>
            remove
          </button>
        </div>

        <button id="hide-detail" onClick={SetShowBlockDetailVisible}>
          hide detail
        </button>
      </div>
    </div>
  );
};

export default Blog;
