import { useEffect, useState } from 'react'
import axios from 'axios'

const allCountries = 'https://studies.cs.helsinki.fi/restcountries/api/all'

function App() {
  const [countries, setCountry] = useState([])
  const [pattern, setNewpattern] = useState('')

  useEffect(() => {
    axios
      .get(allCountries)
      .then(response => {
        setCountry(response.data)
    })
  }, [])

  const handleNewpattern = (event) => {
    setNewpattern(event.target.value)
  }

  const getAllValues = (object) => {
    const values = []

    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        values.push(object[key])
      }
    }
    return values; 
  }

  const handleOneCountry = (countries) => {
    const oneCountry = countries[0]
    const allLanguages = getAllValues(oneCountry.languages)
    return (
      <div>
        <h2>{oneCountry.name.common}</h2>
        <div>{oneCountry.capital}</div>
        <div>{oneCountry.area}</div>
        <h3>languages</h3>
        <ul>
          {allLanguages.map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={oneCountry.flags.png}></img>
      </div>
    )
  } 

  const handleLessThanTenCountries = (countries) => {
    return (
      <ul>
        {countries.map((country, index) => (
          <li key={index}>{country.name.common}</li>
        ))}
      </ul>
    )
  }
  
  const getCountry = (pattern, countries) => {
    if (pattern === '') {
      return <div>Please do the pattern more specific.</div>
    }
    else {
      const filteredCountries = countries.filter(country => country.name.common.toUpperCase().includes(pattern.toUpperCase()))
      console.log('%cApp.jsx line:28 filteredContries.length', 'color: white; background-color: #007acc;', filteredCountries.length);
      if (filteredCountries.length === 1) {
        return handleOneCountry(filteredCountries)
        
      } 
      else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
        return handleLessThanTenCountries(filteredCountries)
      }
      else {
        return <div>Please do the pattern more specific.</div>
      }
    }
  }

  return (
    <div>
      find countries <input value={pattern} onChange={handleNewpattern}></input>
      { getCountry(pattern, countries) }
    </div>
    
  )
}

export default App
