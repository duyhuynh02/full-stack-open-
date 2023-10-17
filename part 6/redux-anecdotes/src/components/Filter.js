import { useDispatch } from 'react-redux'
import { inputOf } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
      const input = event.target.value 
      dispatch(inputOf(input)) //dispatch ở đây dùng để điều hướng cho cái state thôi nhỉ 
    }

    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )


}
  
  export default Filter