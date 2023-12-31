import { useEffect, useState } from 'react'
import axios from 'axios'

const allCountries = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const api_key = import.meta.env.VITE_SOME_KEY

const Button = ( {country} ) => {
  const [state, setState] = useState('show')
  
  const handleShowViewButton = (event) => {
    if (state === 'show') {
      setState('hide')
    }
    else {
      setState('show')
    }
  }

  return (
    <div>
      {state === 'show' ? (
          <div>
            <button onClick={handleShowViewButton}>{state}</button>
          </div>
        ) : ( 
          <div>
            { country.capital } { country.area } {country.continents}
            <button onClick={handleShowViewButton}>{state}</button>
          </div>
        )
      }
    </div>
  )

}

function App() {
  const [countries, setCountry] = useState([])
  const [pattern, setNewpattern] = useState('')
  const [geo, setGeo] = useState({lat: 0, lon: 0})

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
    const countryGeoConvertingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${oneCountry.name.common}&limit=5&appid=${api_key}`

    /*This one below send too many requests to the server, still cannot figure out how to fix this.
    I may comeback later to resolve this issue, but in the current condition, I cannot. 
    */
    axios
      .get(countryGeoConvertingUrl)
      .then(response => {
        setGeo({lat: response.data[0].lat, lon: response.data[0].lon})
        console.log('%cApp.jsx line:77 geo', 'color: #007acc;', geo);
    })
    

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
        <h2>Weather in {oneCountry.capital}</h2>



      </div>
    )
  } 

  const handleLessThanTenCountries = (countries) => {
    return (
      <ul>
        {countries.map((country, index) => (
            <li key={index}>
              {country.name.common}
              <Button country={country} />
            </li>
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
