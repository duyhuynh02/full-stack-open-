import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', url: '', author: '' })

  const addBlog = (event) => {
    event.preventDefault()

    const newObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url || 'http://fullstackopen.com',
    }

    createBlog(newObject)
  }

  return (
    <div>
      <h2>Add new blogs</h2>
      <form onSubmit={addBlog}>
        <div>
            title
          <input
            value={newBlog.title}
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
            placeholder='write title of blog here'
          />
        </div>
        <div>
            author
          <input
            value={newBlog.author}
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
            placeholder="write author of blog here"
          />
        </div>
        <div>
            url
          <input
            value={newBlog.url}
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
            placeholder="write url of blog here"
          />
        </div>
        <button id="create-button" type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm