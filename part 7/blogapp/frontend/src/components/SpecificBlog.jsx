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

    const specificBlog = blogs.filter(blog => blog.id === id)
    // console.log('specific blog: ', specificBlog)
    const comments = specificBlog.map(blog => blog.comments)

    if (!specificBlog[0] || comments.length === 0 ) {
        return null 
    }

    // comments[0].map(comment => console.log(`${comment.id}: `, comment.content))
    
    return (
        <div>
            <h1>{specificBlog[0].title}</h1>
            <p>{specificBlog[0].url}</p>
            <p>{specificBlog[0].likes}</p>
            <p>added by {specificBlog[0].user.name}</p>
            <h2>Comments</h2>
            {comments[0].map(comment => {
                return (
                 <li key={comment.id}>
                    {comment.content}
                </li>
                )
              }
            )}

        </div>
    )
}
  
export default SpecificBlog;
  