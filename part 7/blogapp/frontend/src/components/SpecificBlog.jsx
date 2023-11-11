import {
    useParams,
} from 'react-router-dom'


const SpecificBlog = ({ blogs }) => {
    const id = useParams().id
    // console.log('blogs: ', blogs)
    // console.log('id: ', id)

    if (blogs.length === 0) {
        return null;
      }

    const specificBlogsUserList = blogs.filter(blog => blog.user && blog.user.id === id)
    if (specificBlogsUserList.length === 0) {
      return null
    }

    return (
        <div>
          <h2>{specificBlogsUserList[0].user.author}</h2>
          {specificBlogsUserList.map(blog => <li key={blog.id}>{blog.title}</li>)}
        </div>
    )
  }
  
  export default SpecificBlog;
  