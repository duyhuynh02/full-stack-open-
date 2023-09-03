import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ( {pattern, filter }) => {
  return (
    <div>
      filter shown with 
      <input value={pattern} onChange={filter}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        name: <input value={props.newName} onChange={props.handleNewName}/>
      </div>
      <div>
        number: <input value={props.newPhoneNumber} onChange={props.handleNewPhoneNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
  </form>
  )
}

const Persons = ( {pattern, persons, handleFilteredName} ) => {
  return (
    <div> 
      {pattern === '' 
      ? persons.map((person, index) => (
        <div key={index}>
          {person.name} {person.number}
        </div>
      ))
        : <div>{handleFilteredName(pattern, persons)}</div>
      }
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('dd-dd-dddd')
  const [pattern, setNewPattern] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault() 
    const newObj = {name: newName, number: newPhoneNumber}
    if (persons.find( (obj) => JSON.stringify(obj) === JSON.stringify(newObj))) {
      alert(`${newObj.name} is already added to phonebook`)
    } 
    else {
      axios
        .post('http://localhost:3001/persons', newObj)
        // .catch(error => { console.log('add failed') })
      setPersons([...persons, newObj])
    }
    setNewName('')
    setNewPhoneNumber('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhoneNumber = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleNewPattern = (event) => {
    setNewPattern(event.target.value)
  }

  const handleFilteredName = (pattern, listOfObjects) => {
    pattern = pattern.toUpperCase()
    const filteredPersonList = listOfObjects.filter(obj => obj.name.toUpperCase().includes(pattern))
    return filteredPersonList.map((person, index) => <div key={index}> {person.name} {person.phone}</div>)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter pattern={pattern} filter={handleNewPattern}/>
      <h3>add a new</h3>
      <PersonForm newName={newName} newPhoneNumber={newPhoneNumber} addName={addName}
                      handleNewName={handleNewName} handleNewPhoneNumber={handleNewPhoneNumber} /> 
      <h3>Numbers</h3>
      <Persons pattern={pattern} persons={persons} handleFilteredName={handleFilteredName}/>
    </div>

  )
}


export default App

