import { useState, useEffect } from "react";
import blogService from "../services/blogs";

import { updateBlog } from "../features/blogSlice";
import { useDispatch, useSelector } from "react-redux";

const Blog = ({ blog, handleLikes }) => {
  const [blogDetailVisible, setblogDetailVisible] = useState(false);
  const hideBlogDetailWhenVisible = {
    display: blogDetailVisible ? "none" : "",
  };
  const showBlogDetailWhenVisible = {
    display: blogDetailVisible ? "" : "none",
  };

  const blogs = useSelector(state => state.blogs)
  // console.log('blogs: ', blogs)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleBlogLikes = () => {
    const id = blog.id 
    const currentBlog = blogs.filter(blog => blog.id === id)[0]
    dispatch(updateBlog(currentBlog))
    return currentBlog
  };

  const handleLikesAndUpdate = () => {
    const currentBlog = handleBlogLikes()
    handleLikes(currentBlog);
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
            {blog.likes}
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
