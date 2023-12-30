/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const bmi = Number(req.query.weight) / ((Number(req.query.height) / 100) ** 2);
  const message = bmi < 18.5 ? 'underweight' 
                    : ((bmi >= 18.5) && (bmi <= 24.9)) ? 'Normal (healthy weight)'
                    : (bmi > 24.9) ? 'Overweight' : 'Invalid BMI';

  if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
    res.send({
        error: "malformatted parameters"
    });
  }

  res.send({
    height: req.query.height, 
    weight: req.query.weight,
    bmi: message
  });
});

app.post('/exercises', (req, res) => {
  const dailyExerciseHoursArray = req.body.daily_exercises;
  const target = req.body.target; 

  if (!dailyExerciseHoursArray || !target) {
    res.status(400).json({
      error: "parameters missing"
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (isNaN(target) || dailyExerciseHoursArray.some(isNaN)) {
    res.status(400).json({
      error: "malformatted parameters"
    })
  }


  const periodLength = dailyExerciseHoursArray.length;
  const trainingDays = dailyExerciseHoursArray.filter((day: number) => day > 0).length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
  const average = dailyExerciseHoursArray.reduce((a: any, b: any) => a + b, 0) / 7;
  const success = average >= target;

  const rating = Math.round(average);
  const ratingDescription = `You did ${
      rating === 1 ? 'not so good' :
      rating === 2 ? 'not too bad but could be better' : 
      'best'
  }`;

  const result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };

  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});