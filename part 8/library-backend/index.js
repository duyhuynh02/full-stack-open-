const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

require('dotenv').config()

const Author = require('./models/author')
const Book = require('./models/book')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = `

  type Book {
    title: String!
    published: Int! 
    author: Author! 
    id: ID! 
    genres: [String!]!
  }

  type Author {
    name: String! 
    born: Int
    bookCount: Int!
  }

  type editAuthor {
    name: String! 
    born: Int!
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int! 
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ): Book 

    editAuthor(
      name: String!
      born: Int! 
    ): editAuthor

  }

`

const resolvers = {
  Query: {
    bookCount: () => books.length, 
    authorCount: () => authors.length, 
    allBooks: (root, args) => {
        const booksByAuthor = Object.hasOwn(args, 'author') 
                                    ? books.filter(book => book.author === args.author) 
                                    : books                                   
        const booksByAuthorAndGenres = Object.hasOwn(args, 'genre') 
                                            ? booksByAuthor.filter(book => book.genres.includes(args.genre)) 
                                            : booksByAuthor
        return booksByAuthorAndGenres

    },
    allAuthors: () => authors 
  }, 

  Author: {
    bookCount: (author) => {
        const booksByAuthor = books.filter(book => book.author === author.name)
        return booksByAuthor.length
    }
  },

  Mutation: {
    addBook: async (root, args) => {
        // const book = { ...args, id: uuid() }
        // console.log('args: ', args)
        const allAuthors = books.map(book => book.author)
        // console.log('1')
        if (!allAuthors.includes(args.author)) {
          console.log('2')
          const newAuthor = new Author({ name: args.author })
          console.log('2.1')
          const book = new Book({...args, author: newAuthor._id })
          console.log('2.2')
          await newAuthor.save()
          console.log('2.3')
          await book.save()
          console.log('2.4')
          return book
        } else { 
          // console.log('3')
          const book = new Book({...args})
          await book.save()
          return book
        }
        // console.log('book author: ', book)
        // const allAuthors = books.map(book => book.author)

        // if (!allAuthors.includes(args.author)) {
        //   const new_author = {name: args.author, bookCount: 1, born: null, id: uuid()} 
        //   authors = authors.concat(new_author)
        // }
        // books = books.concat(book)
        // return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        return null 
      }
      const updatedAuthor = {name: args.name, born: args.born}
      console.log('updated author: ', updatedAuthor)
      authors = authors.map(a => a.name === updatedAuthor.name ? updatedAuthor : a)
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

