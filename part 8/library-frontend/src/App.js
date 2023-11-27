import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { gql, useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const resultAuthor = useQuery(ALL_AUTHORS)
  const resultBook = useQuery(ALL_BOOKS)

  if (resultAuthor.loading) {
    return <div>loading authors...</div>
  }

  if (resultBook.loading) {
    return <div>loading books...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={resultAuthor.data.allAuthors}/>

      <Books show={page === 'books'} books={resultBook.data.allBooks} />

      <NewBook show={page === 'add'}/>
    </div>
  )
}

export default App
