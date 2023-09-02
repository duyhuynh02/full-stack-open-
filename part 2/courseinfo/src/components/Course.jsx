const Header = ({ course }) => {
  console.log('Header: ', course) 
  return (
    <div>
      <h1>{course.name}</h1>
      <Content parts={course.parts} course={course} />
      <Total parts={course.parts} course={course}/>
    </div>
  )
}

const Content = ({ course }) => {
  console.log('Content: ', course)
  console.log('Content course part: ', course.parts)
  return (
    <div>
      {course.parts.map((part) => <Part key={part.id} parts={part} />)}
    </div>
  )
}

const Part = (props) => {
  console.log('Part: ', props)
  return (
    <p>
      {props.parts.name} {props.parts.exercises}
    </p>
  )
}

const Total = (props) => {
  console.log('Total: ', props)
  const total = props.parts.reduce((total, part) => total + part.exercises,0)
  
  return (
    <p>Total of {total} exercises</p>
  )
}

const Course = ({ course }) => {
  console.log('Course: ', course)
  return (
    <Header name={course.name} course={course}/>
  )
}

export default Course