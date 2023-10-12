import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    // console.log('vote', id)
    dispatch({
      type: 'VOTE', 
      payload: { id }
    })
  }

  const addAnecdote = (event) => {
    //set default event để nó ko tự động gửi form hoặc etc 
    event.preventDefault()
    //lấy content của event 
    const content = event.target.anecdote.value 
    //set cho field input trở về ban đầu, tức là rỗng '' 
    event.target.anecdote.value = ''
    //dispatch, type là new_anecdote, payload có thể là content 
    dispatch({
      type: 'NEW_ANECDOTE', 
      payload: { content }
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App