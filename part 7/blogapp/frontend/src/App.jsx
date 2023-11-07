import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

import { useSelector, useDispatch } from "react-redux";
import { setNotification } from './features/notificationSlice'
import { addBlogs } from './features/blogSlice'
import { setUsername, setPassword } from "./features/userSlice";

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const username = useSelector(state => state.user.username)
  const password = useSelector(state => state.user.password)
  const [user, setUser] = useState(null);
  const message = useSelector(state => state.notification.value)
  const [blogCreateVisible, setBlogCreateVisible] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(addBlogs(blogs))
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      dispatch(setUsername(""));
      dispatch(setPassword(""));
    } catch (exception) {
      helperNotification("Wrong username or password");
    }
  };

  const helperNotification = (message) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
  };

  const loginForm = () => (
    <div>
      <h2>login to the app</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => dispatch(setUsername(target.value))}
          />
        </div>

        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => dispatch(setPassword(target.value))}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );

  const blogForm = () => {
    const hideBlogWhenVisible = { display: blogCreateVisible ? "none" : "" };
    const showBlogWhenVisible = { display: blogCreateVisible ? "" : "none" };

    return (
      <div>
        <div style={hideBlogWhenVisible}>
          <button onClick={() => setBlogCreateVisible(true)}>
            create new note
          </button>
        </div>
        <div style={showBlogWhenVisible}>
          <BlogForm createBlog={addBlog} />
          <button onClick={() => setBlogCreateVisible(false)}>
            hide new note
          </button>
        </div>
      </div>
    );
  };

  const addBlog = (newObject) => {
    blogService.create(newObject).then((returnedBlog) => {
      // console.log('return blog: ', returnedBlog)
      addBlogs(blogs.concat(returnedBlog));
      helperNotification(`New blog just added by ${user.username}`);
    });
  };

  const compareByLike = (a, b) => {
    if (a && b) {
      return b.likes - a.likes;
    } else {
      console.log("there is no object"); //for debugging purpose
    }
  };

  const handleLikes = async (newBlog) => {
    blogService.update(newBlog);
  };

  const allBlogsUser = () => {
    const allBlogsFromUser = blogs
      .filter((blog) => blog.user && blog.user.username === user.username)
      .sort();
    // console.log('allBlogsFromUser: ', allBlogsFromUser)
    allBlogsFromUser.sort(compareByLike);

    return allBlogsFromUser.map((blog) => (
      <Blog key={blog.id} blog={blog} handleLikes={handleLikes} />
    ));
  };

  const removeloggedBlogappUser = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    helperNotification(`${user.username} just logged out`);
    window.location.reload();
  };

  return (
    <div>
      {<Notification message={message} />}
      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in
            <button onClick={removeloggedBlogappUser}>logout</button>
          </p>
          {allBlogsUser()}
          {blogForm()}
        </div>
      )}
    </div>
  );
};

export default App;
