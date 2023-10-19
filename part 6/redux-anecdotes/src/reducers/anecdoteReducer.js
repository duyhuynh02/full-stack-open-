import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

// export const addAnecdoteOf = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: { content }
//   }
// }

// export const voteOf = (id) => {
//   return {
//     type: 'VOTE', 
//     payload: { id }
//   }
// }

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'NEW_ANECDOTE':
//       const new_anecdote = asObject(action.payload.content)
//       return [...state, new_anecdote]

//     case 'VOTE': 
//       const id = action.payload.id 
//       console.log('id: ', id)
//       const anecdoteToChange = state.find(anecdote => anecdote.id === id)
//       const changedAnecdote = {...anecdoteToChange, votes: ++anecdoteToChange.votes}
//       return state.map(a => a.id !== id ? a : changedAnecdote)
//     default:
//       return state
//   }
// }

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: initialState,
  reducers: {
    addAnecdoteOf(state, action) {
      console.log('state of add: ', JSON.parse(JSON.stringify(state)))
      console.log('action: ', action)
      const new_anecdote = asObject(action.payload)
      return [...state, new_anecdote]
    },
    voteOf(state, action) {
      // console.log('state of Vote: ', JSON.parse(JSON.stringify(state)))
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      return state.map(a => a.id !== id ? a : changedAnecdote)
    }
  }
})

export const { addAnecdoteOf, voteOf } = anecdoteSlice.actions 
export default anecdoteSlice.reducer 