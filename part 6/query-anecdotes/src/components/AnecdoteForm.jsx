import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Notification from '../components/Notification'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  let errorMessage

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }, 
    onError: () => {
      alert('too short anecdote, must have at least 5 or more')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  } 

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
