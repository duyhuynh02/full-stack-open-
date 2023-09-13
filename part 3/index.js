require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Phone = require('./models/phone')

morgan.token('personNameAndNumber', (request) => {
  const { name, number } = request.body 
  return `{"name": "${name}", "number": "${number}"}` 
})


const handleMiddleware = (request, response, next) => {
  if (request.method === 'POST') {
    morgan(':method :url :status :response-time[3] :personNameAndNumber')(request, response, next)
  } else {
    morgan('tiny')(request, response, next)
  }
}

app.use(express.static('dist'))
app.use(express.json())
app.use(handleMiddleware)

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  console.log('hello')
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

let persons = [
]


app.get('/api/persons', (request, response) => {
    //ex 3.13
    Phone.find({}).then(phones => {
      response.json(phones)
    })
})

app.get('/info', (request, response) => {
    const count = Object.keys(persons).length
    request.startTime = new Date();
    const receivedTime = request.startTime.toLocaleString()
    response.send(`<div>Phone book has infor for ${count} people </br>${receivedTime}</div>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id 
  const person = persons.find(person => person.id == id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }

})

app.delete('/api/persons/:id', (request, response, next) => {
  //ex 3.15
  Phone.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))

})

app.use(errorHandler)

app.post('/api/persons', (request, response) => {
  //ex 3.14
  const body = request.body 

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Missing name or number of a person. Check again."
    })
  }

  const phone = new Phone({
    name: body.name, 
    number: body.number,
  })

  phone.save().then(savedPhone => {
    response.json(savedPhone)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body 
  console.log('body: ', body)

  const phone = {
    name: body.name,
    number: body.number 
  }

  Phone.findByIdAndUpdate(request.params.id, phone, { new: true })
    .then(updatedPhone => {
      response.json(updatedPhone)
    })
    .catch(error => next(error))
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}\n`)
})