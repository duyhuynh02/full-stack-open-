import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  const patientEntry = patientService.findById(req.params.id);

  if (patientEntry) {
    res.send(patientEntry);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = utils.toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patientEntry = patientService.findById(req.params.id);
    const newEntry = utils.toNewEntry(req.body);
    if (patientEntry) {
      const addedEntry = patientService.addEntry(patientEntry, newEntry);
      res.json(addedEntry);
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'; 
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message; 
    }
    res.status(400).send(errorMessage);
  }
}); 

export default router;