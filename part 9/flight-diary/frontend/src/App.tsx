import { useEffect, useState } from "react";
import { getAllDiaries, createDiary } from "./diaryService";
import { NonSensitiveDiaryEntry } from "./types";
import Message from "./Message";
import { Weather, Visibility } from "./types";



const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState<Weather | undefined>(undefined);
  const [newVisibility, setNewVisibility] = useState<Visibility | undefined>(undefined);
  const [newComment, setNewComment] = useState('');
  const [message, setNewMessage] = useState('');


  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd = {
      date: newDate, 
      weather: newWeather, 
      visibility: newVisibility, 
      comment: newComment, 
    }

    try {
      const data = await createDiary(diaryToAdd);
      setDiaries(diaries.concat(data));
    } catch (error) {
      if (error instanceof Error) {
        setNewMessage(error.message);
        setTimeout(() => {
          setNewMessage('');
        }, 5000)
      }
    }    
    setNewDate('');
    setNewWeather(undefined);
    setNewVisibility(undefined);
    setNewComment('');
  }

  return (
    <div>
      <h1>Add new diary</h1>
      {message ? <Message color="red" message={message} /> : null}
      <form onSubmit={diaryCreation}>
        <ul>
          <li>
            date
            <input 
              type="date"
              value={newDate}
              onChange={(event) => setNewDate(event.target.value)}
            />
          </li>

          <li>
            weather 
            <input 
              type="radio"
              name="weather"
              value="sunny"
              onChange={(e) => setNewWeather(e.target.value as Weather)}
            />
            sunny
            <input 
              type="radio"
              name="weather"
              value="rainy"
              onChange={(e) => setNewWeather(e.target.value as Weather)}
            />
            rainy
            <input 
              type="radio"
              name="weather"
              value="cloudy"
              onChange={(e) => setNewWeather(e.target.value as Weather)}
            />
            cloudy 
            <input 
              type="radio"
              name="weather"
              value="stormy"
              onChange={(e) => setNewWeather(e.target.value as Weather)}
            />
            stormy 
            <input 
              type="radio"
              name="weather"
              value="windy"
              onChange={(e) => setNewWeather(e.target.value as Weather)}
            />
            windy
          </li>

          <li>
            visibility
            <input 
              type="radio"
              value="great"
              name="visibility"
              onChange={(event) => setNewVisibility(event.target.value as Visibility)}
            />
            great 
            <input 
              type="radio"
              value="good"
              name="visibility"
              onChange={(event) => setNewVisibility(event.target.value as Visibility)}
            />
            good
            <input 
              type="radio"
              value="ok"
              name="visibility"
              onChange={(event) => setNewVisibility(event.target.value as Visibility)}
            />
            ok
            <input 
              type="radio"
              value="poor"
              name="visibility"
              onChange={(event) => setNewVisibility(event.target.value as Visibility)}
            />
            poor  
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
