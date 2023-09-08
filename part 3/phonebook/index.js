const express = require('express')
const app = express()

app.use(express.json())

let persons = [
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

app.delete('/api/persons/:id', (request, response) => {
  //exercise 3.4
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  //exercise 3.5
  const new_person = request.body 
  const new_id = Math.floor(Math.random() * (65535)) + 1
  
  new_person.id = new_id 
  persons = persons.concat(new_person)

  response.json(new_person)
})

const PORT = 3001 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})