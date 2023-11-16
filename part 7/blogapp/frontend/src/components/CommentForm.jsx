import { useState } from "react";

import blogService from "../services/blogs";

const CommentForm = ({ blogPostId }) => {
    const [newComment, setNewComment] = useState('')

    const addComment = (event) => {
        event.preventDefault()
        
        const newObject = {
            content: newComment, 
            blogId: blogPostId 
        }

        // console.log(newObject)
        blogService.createComment(newObject)

    }

    return (
        <div>
            <form onSubmit={addComment}>
                <input value={newComment}
                        onChange={({ target }) => setNewComment(target.value)}
                        placeholder="add your comment here"
                /> 
                <button>add comment</button>
            </form>
        </div>
    )
}
  
export default CommentForm;
  