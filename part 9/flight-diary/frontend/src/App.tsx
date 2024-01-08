import { useEffect, useState } from "react";
import { getAllDiaries, createDiary } from "./diaryService";
import { NonSensitiveDiaryEntry } from "./types";


const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newComment, setNewComment] = useState('');


  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd = {
      date: newDate, 
      weather: newWeather, 
      visibility: newVisibility, 
      comment: newComment, 
    }

    createDiary(diaryToAdd).then(data => {
      setDiaries(diaries.concat(data))
    })

    setNewDate('');
    setNewWeather('');
    setNewVisibility('');
    setNewComment('');
  }

  return (
    <div>
      <h1>Add new diary</h1>
      <form onSubmit={diaryCreation}>
        <ul>
          <li>
            date
            <input 
              value={newDate}
              onChange={(event) => setNewDate(event.target.value)}
            />
          </li>

          <li>
            weather 
            <input 
              value={newWeather}
              onChange={(event) => setNewWeather(event.target.value)}
            />
          </li>

          <li>
            visibility
            <input 
              value={newVisibility}
              onChange={(event) => setNewVisibility(event.target.value)}
            />
          </li>

          <li>
            comment
            <input 
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
            />
          </li>
        </ul>
        <button type='submit'>add</button>
      </form>
      <ul>
        {diaries.map(diary =>
          <li key={diary.id}>{diary.date} {diary.weather} {diary.visibility}</li>)}
      </ul>
    </div>
  )
}

export default App
