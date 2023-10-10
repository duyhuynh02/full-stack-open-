const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) { 
    case 'GOOD':
      const new_good_state = {...state, good: state.good + 1}
      return new_good_state
    case 'OK':
      const new_ok_state = {...state, ok: state.ok + 1}
      return new_ok_state
    case 'BAD':
      const new_bad_state = {...state, bad: state.bad + 1}
      return new_bad_state
    case 'ZERO':
      const new_all_state = {good: 0, ok: 0, bad: 0}
      return new_all_state
    default: return state
  }
  
}

export default counterReducer
