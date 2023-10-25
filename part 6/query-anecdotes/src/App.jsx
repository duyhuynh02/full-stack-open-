import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateVoteAnecdote } from './requests'
import { useReducer } from 'react'

const queryClient = new QueryClient();

const notiReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE':
      return `anecdote "${action.payload}" voted`
    default:
      return ''
  }
}

const App = () => {
  const [notification, setNotification] = useReducer(notiReducer, "")

  const updateVoteAnecdoteMutation = useMutation({
    mutationFn: updateVoteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
})

  const handleVote = (anecdote) => {
    setNotification({ type: 'VOTE', payload: anecdote.content })
    setTimeout(() => setNotification({}), 5000)
    updateVoteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <span>Error: {result.error.message}</span>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification noti={notification}/>
      <QueryClientProvider client={queryClient}>
        <AnecdoteForm />
      </QueryClientProvider>

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
