import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    voteOf(state, action) {
      // console.log('state of Vote: ', JSON.parse(JSON.stringify(state)))
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      anecdoteService.updateVotes(changedAnecdote)
      return state.map(a => a.id !== id ? a : changedAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addAnecdoteOf, voteOf, appendAnecdote, setAnecdotes } = anecdoteSlice.actions 

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer 