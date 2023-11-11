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

    const specificBlog = blogs.filter(blog => blog.id === id)[0]
    // console.log('specific blog: ', specificBlog)

    if (!specificBlog) {
        return null 
    }

    return (
        <div>
            <h1>{specificBlog.title}</h1>
            <p>{specificBlog.url}</p>
            <p>{specificBlog.likes}</p>
            <p>added by {specificBlog.user.author}</p>
        </div>
    )
}
  
export default SpecificBlog;
  