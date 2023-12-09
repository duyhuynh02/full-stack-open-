import { useQuery } from '@apollo/client'
import { ME } from '../queries'

const Recommendations = (props) => {
  const resultLoggedUser = useQuery(ME) 

  if (!props.show) {
    return null
  }

  const books = [...props.books]  

  if (resultLoggedUser.loading) {
    return <div>loading user...</div>
  }

  const favoriteGenre = resultLoggedUser.data.me.favoriteGenre  



  return (
    <div>
        <h2>Recommendations</h2>
        <p>books in your favorite genre <b>{favoriteGenre}</b></p>
        {books.filter((a) => a.genres.includes(favoriteGenre)).map((a) => (
            <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
            </tr>
        ))}
    </div>
  )
}

export default Recommendations
