import { useState, useEffect } from 'react'
import noteService from './services/notes'

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

const Persons = ( {pattern, persons, handleFilteredName, handlePersonDelete} ) => {
  return (
    <div> 
      {pattern === '' 
      ? persons.map((person, index) => (
        <div key={index}>
          {person.name} {person.number} <button onClick={() => handlePersonDelete(person, person.id)}>delete</button>
        </div>
      ))
        : <div>{handleFilteredName(pattern, persons, handlePersonDelete)}</div>
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
    noteService
      .getAll()
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
      noteService
        .create(newObj)
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

  const handleFilteredName = (pattern, listOfObjects, handlePersonDelete) => {
    pattern = pattern.toUpperCase()
    const filteredPersonList = listOfObjects.filter(obj => obj.name.toUpperCase().includes(pattern))
    return filteredPersonList.map((person, index) => <div 
                                              key={index}> 
                                                  {person.name} 
                                                  {person.phone}
                                                           </div>)
  }

  const handlePersonDelete = (person, id) => {
    console.log(`Check if it works here ` + id)
    if (window.confirm(`Delete this person: ${person.name}?`)) {
      noteService
      .remove(id)
      .then(() => {
        //if the deletion is successul, update the state of array persons
        const updatedPersons = persons.filter(person => person.id !== id)
        setPersons(updatedPersons)
    }
  )
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter pattern={pattern} filter={handleNewPattern}/>
      <h3>add a new</h3>
      <PersonForm newName={newName} newPhoneNumber={newPhoneNumber} addName={addName}
                      handleNewName={handleNewName} handleNewPhoneNumber={handleNewPhoneNumber} /> 
      <h3>Numbers</h3>
      <Persons pattern={pattern} persons={persons} 
          handleFilteredName={handleFilteredName} handlePersonDelete={handlePersonDelete}/>
    </div>

  )
}


export default App

