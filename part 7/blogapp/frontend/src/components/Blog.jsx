import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Blog = ({ blog, handleLikes }) => {
  const [blogDetailVisible, setblogDetailVisible] = useState(false);
  const hideBlogDetailWhenVisible = {
    display: blogDetailVisible ? "none" : "",
  };
  const showBlogDetailWhenVisible = {
    display: blogDetailVisible ? "" : "none",
  };

  const queryClient = useQueryClient()
  const newBlogUpdateMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const removedBlogMutation = useMutation({
    mutation: blogService.remove, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };


  const handleLikesAndUpdate = () => {
    const newBlog = {...blog, likes: blog.likes + 1}
    newBlogUpdateMutation.mutate(newBlog)
    handleLikes(newBlog); //send to backend server, geez i even don't need this, but anyway, too lazy to refactor again....
  };

  const removeBlog = () => {
    if (window.confirm("Do you really want to delete this post?")) {
      removedBlogMutation.mutate(blog)
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
