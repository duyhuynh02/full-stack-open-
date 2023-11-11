import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Users from "./components/Users"
import SpecificBlogUser from "./components/SpecificBlogUser";

import blogService from "./services/blogs";
import loginService from "./services/login";
import usersService from "./services/users"

import { setNotification } from './features/notificationSlice'
import { addBlogs } from './features/blogSlice'
import { setUsername, setPassword } from "./features/userSlice";
import { getAllUsers } from "./features/allUsersSlice";

import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams,
} from 'react-router-dom'


const App = () => {
  const blogs = useSelector(state => state.blogs)
  const username = useSelector(state => state.user.username)
  const password = useSelector(state => state.user.password)
  const [user, setUser] = useState(null);
  const message = useSelector(state => state.notification.value)
  const [blogCreateVisible, setBlogCreateVisible] = useState(false);
  const allUsers = useSelector(state => state.users)

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs => {dispatch(addBlogs(blogs))});
    usersService.getAll().then(users => {dispatch(getAllUsers(users))})
  }, []);

  // console.log('blogs: ', blogs)

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

  const loggedinBlogsUser = () => {
    const allBlogsFromUser = blogs
      .filter((blog) => blog.user && blog.user.username === user.username)
      .sort();
    // console.log('allBlogsFromUser: ', allBlogsFromUser)
    allBlogsFromUser.sort(compareByLike);

    return (
      <div>
        {allBlogsFromUser.map((blog) => (
          <Blog key={blog.id} blog={blog} handleLikes={handleLikes}/>
        ))}
        {blogForm()}
      </div>
    )
  };

  const removeloggedBlogappUser = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    helperNotification(`${user.username} just logged out`);
    window.location.reload();
  };
  
  const padding = {
    padding: 5
  }

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
          <Router>
            <div>
              <Link style={padding} to="/"></Link>
              <Link style={padding} to="/users">users</Link>
            </div>

            <Routes>
              <Route path="/users/:id" element={<SpecificBlogUser blogs={blogs}/>}/>
              <Route path="/" element={loggedinBlogsUser()}/>
              <Route path="/users" element={<Users users={allUsers}/>}/>
            </Routes>

          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
