import { useSelector, useDispatch } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if ( state.filter === '' ) {
            return [...state.anecdotes] //tạo 1 array mới bằng cách sử dụng spreading state. 
        } else {
            const new_state = state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
            return new_state
        }
    }) 

    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteOf(id))
    }

    const sortAnecdote = (a, b) => {
        return b.votes - a.votes 
    }  

    return (
        <div>
            {anecdotes.sort(sortAnecdote).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
  }
  
export default AnecdoteList