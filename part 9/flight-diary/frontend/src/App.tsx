import { useEffect, useState } from "react";
import { getAllDiaries } from "./diaryService";
import { NonSensitiveDiaryEntry } from "./types";


const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry>([]);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  return (
    <div>
      <ul>
        {diaries.map(diary =>
          <li key={diary.id}>{diary.date} {diary.weather} {diary.visibility}</li>)}
      </ul>
    </div>
  )
}

export default App
