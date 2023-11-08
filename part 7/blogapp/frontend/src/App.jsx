import { useState, useEffect, useReducer } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const messageReducer = (state, action) => {
  // console.log('action type: ', action)
  switch (action.type) {
    case "ADD_MESSAGE":
      return action.message
    default:
      return state 
  }
}

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useReducer(messageReducer, '')
  const [user, setUser] = useState(null);
  const [blogCreateVisible, setBlogCreateVisible] = useState(false);
  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await blogService.getAll()
      // console.log('res: ', res)
      return res
    }
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const blogs = result.data


  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      helperNotification("Wrong username or password");
    }
  };

  const helperNotification = (message) => {
    setMessage({ type: 'ADD_MESSAGE', message });
    setTimeout(() => {
      setMessage({});
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
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
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
      newBlogMutation.mutate(newObject)
      helperNotification(`New blog just added by ${user.username}`)

  };

  const compareByLike = (a, b) => {
    if (a && b) {
      return b.likes - a.likes;
    } else {
      console.log("there is no object"); //for debugging purpose
    }
  };

  const handleLikes = (newBlog) => {
    blogService.update(newBlog);
  };

  const allBlogsUser = () => {
    const allBlogsFromUser = blogs
      .filter((blog) => blog.user && blog.user.username === user.username)
      .sort();
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
