export const inputOf = (input) => {
    return {
        type: 'FILTER', 
        payload: input
    }
}
  
const filterReducer = (state='', action) => {
    // console.log('state now of filterReducer: ', state)
    switch (action.type) {
        case 'FILTER':
            return action.payload
        default:
            return state
    }
}
  
  export default filterReducer