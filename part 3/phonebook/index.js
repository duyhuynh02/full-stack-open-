const express = require('express')
const app = express()

app.use(express.json())

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  //exercise 3.1
    response.json(persons)
})

app.get('/info', (request, response) => {
  //exercise 3.2
    const count = Object.keys(persons).length
    request.startTime = new Date();
    const receivedTime = request.startTime.toLocaleString()
    response.send(`<div>Phone book has infor for ${count} people </br>${receivedTime}</div>`)
})

app.get('/api/persons/:id', (request, response) => {
  //exercise 3.3
  const id = request.params.id 
  const person = persons.find(person => person.id == id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }

})

const PORT = 3001 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})