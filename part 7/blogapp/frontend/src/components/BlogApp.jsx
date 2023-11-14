const BlogApp = ({ blogs, user }) => {
    const allBlogsFromUser = blogs.filter((blog) => blog.user && blog.user.username === user.username)

    return (
        <div>
            <h1>Blog App</h1>
            {allBlogsFromUser.map((blog) => (
                    <li key={blog.id}>
                        {blog.title} {blog.author}
                    </li>

            ))}
        </div>
    )
}
  
export default BlogApp;
  