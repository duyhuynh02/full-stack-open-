import { useSelector, useDispatch } from 'react-redux'
import { voteOf } from './reducers/anecdoteReducer'
import AnecdoteForm  from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteOf(id))
  }

  const sortAnecdote = (a, b) => {
    return b.votes - a.votes 
  }

  return (
    <div>
      <h2>Anecdotes</h2>
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
      <AnecdoteForm /> 
    </div>
  )
}

export default App