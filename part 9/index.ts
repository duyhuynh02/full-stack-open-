import express from 'express';
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});