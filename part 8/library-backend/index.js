const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

const { GraphQLError } = require("graphql")

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

let authors = []
let books = []

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
    allBooks(author: String, genre: String): [Book!]!
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
    bookCount: async () => Book.collection.countDocuments(), 
    authorCount: async () => Author.collection.countDocuments(), 
    allBooks: async (root, args) => {
      if (!args.genre) {
        return Book.find({}).populate('author')
      } else {
        return Book.find({ genres: args.genre }).populate('author')
      }
    },
    allAuthors: async () => {
      return Author.find({}) 
    }
  }, 

  Author: {
    bookCount: async (author) => await Book.count({ author: author._id })
  },

  Mutation: {
    addBook: async (root, args) => {
        console.log('args: ', args)
        if (args.title.length < 5) {
          throw new GraphQLError("Title of book should not be less than 5 characters", {
            extensions: { code: 'BAD_USER_INPUT' },
          });
        }

        const existedAuthor = await Author.findOne({ name: args.author })

        if (existedAuthor === null) {
          if (args.author.length < 4) {
            throw new GraphQLError("Author's name should be at least 4 characters", {
              extensions: { code: 'BAD_USER_INPUT' },
            });
          }
          const newAuthor = new Author({ name: args.author })
          await newAuthor.save()
          const book = new Book({...args, author: newAuthor })
          await book.save()
          return book
        } else { 
          const book = new Book({...args, author: existedAuthor })
          await book.save()
          return book
        }
    },
    editAuthor: async (root, args) => {
      try {
        const author = await Author.findOne({ name: args.name })

        if (!author) {
          return null 
        }

        const filter = { _id: author._id }
        const update = { $set: { born: args.born } }
        const options = {
          returnOriginal: false,
          projection: { _id: 0, name: 1, born: 1, bookCount: 1 }
        }
        return Author.findOneAndUpdate(filter, update, options)
      } catch (error) {
        throw new Error('Something went wrong while editing the author')
      }
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

