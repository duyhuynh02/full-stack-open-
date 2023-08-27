import { useState } from 'react'

const Button = (props) => {
  // console.log('Button: ', props)
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  // console.log('Statistic Line: ', props)
  return (
    <Button handleClick={props.arrayFunction} text={props.text}/>
  )
}

const Statistics = (props) => {
  // console.log('Statistics: ', props)
  return (
    <div>
      <StatisticLine text='good' arrayFunction={props.arrayFunction[0]} />
      <StatisticLine text='neutral' arrayFunction={props.arrayFunction[1]} />
      <StatisticLine text='bad' arrayFunction={props.arrayFunction[2]} />
    </div>
  )
}

const History = ({good, neutral, bad}) => {
  const total = good + neutral + bad 

  if (total === 0) {
    return ( 
      <div>No feedback given</div>
    )
  }
  return (
    <div> 
      <div>good {good}</div>
      <div>neutral {neutral} </div>
      <div>bad {bad}</div>
      <div>all {total} </div>
    <div>average {((good - bad) / (total))}</div>
    <div>positive {good / (total) * 100}</div>
  </div>
  )
}


const App = () => {
  //save clicks of each button to its own state 
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleSetGood = () => {
    setGood(good + 1)
  }

  const handleSetNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleSetBad = () => {
    setBad(bad + 1)
  }

  const handleArr = [handleSetGood, handleSetBad, handleSetNeutral]

  return (
    <div>
      <h1>give feedback</h1>
      <Statistics arrayFunction={handleArr}/>
      <h1>statistics</h1>
      <History good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
