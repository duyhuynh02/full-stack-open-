import { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('')

  if (!props.show) {
    return null
  }

  // console.log('props: ', props)
  const books = [...props.books]
  // console.log('books: ', books)

  // const allGenres = books.map(book => book.genres.map)
  // console.log(allGenres)

  // const a = books.map(book => book.genres)
  // const b  = a.map(c => c)
  // console.log('b: ', b)

  // const allGenres = books.map(book => book.genres).flat()
  // console.log(allGenres)
  // const noDuplicateGenres = [...new Set(allGenres)]
  // console.log('no duplicate genres: ', noDuplicateGenres)

  const allNoneDuplicateGenres = [...new Set(books.flatMap(book => book.genres))]
  // console.log(allNoneDuplicateGenres)

  const handleGenre = (event) => {
    // console.log('event: ', event)
    event.preventDefault()
    setGenre(event.target.textContent)
    // const genre = event.target.textContent
    // alert(genre)  
  }
  
  console.log('genre: ', genre)

  return (
    <div>
      <h2>books</h2>
      <p>in genre: {genre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => genre === '' ?               
                                          <tr key={a.title}>
                                            <td>{a.title}</td>
                                            <td>{a.author.name}</td>
                                            <td>{a.published}</td>
                                          </tr>
                                          :
                                          a.genres.includes(genre) && 
                                          (
                                            <tr key={a.title}>
                                              <td>{a.title}</td>
                                              <td>{a.author.name}</td>
                                              <td>{a.published}</td>
                                            </tr>
            )
          )}
        </tbody>
      </table>

      <div>
        {allNoneDuplicateGenres.map(genre => 
          <button key={allNoneDuplicateGenres.indexOf(genre)} 
                  onClick={handleGenre}>
            {genre}
          </button>
          )
        }
        <button onClick={() => setGenre('')}>all genre</button>
      </div>
    </div>
  )
}

export default Books
