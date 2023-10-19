import { useDispatch } from 'react-redux'
import { addAnecdoteOf } from '../reducers/anecdoteReducer'
import { noti } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value 
        event.target.anecdote.value = ''
        dispatch(noti(`you created a new blog "${content}"`))
        dispatch(addAnecdoteOf(content))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div><input name="anecdote"/></div>
            <button type="submit">create</button>
            </form>
        </div>
    )
}
  
  export default AnecdoteForm