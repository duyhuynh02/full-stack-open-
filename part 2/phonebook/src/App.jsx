import { useState } from 'react'

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
          {person.name} {person.phone}
        </div>
      ))
        : <div>{handleFilteredName(pattern, persons)}</div>
      }
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '12-34-5689', id:1 },
    { name: 'Ada Lovelace', phone: '39-44-5213', id: 2},
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3},
    { name: 'Mary Poppendieck', phone: '39-23-6341', id: 4},
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('dd-dd-dddd')
  const [pattern, setNewPattern] = useState('')

  const addName = (event) => {
    event.preventDefault() 
    const newObj = {name: newName, phone: newPhoneNumber}
    if (persons.find( (obj) => JSON.stringify(obj) === JSON.stringify(newObj))) {
      alert(`${newObj.name} is already added to phonebook`)
    } 
    else {
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

