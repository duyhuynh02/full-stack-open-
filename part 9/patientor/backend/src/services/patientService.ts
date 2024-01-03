import patientsData from '../data/patients';
import { nonSSNPatient, Patient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: nonSSNPatient[] = patientsData;


const getEntries = (): nonSSNPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: uuid(), 
      ...patient
    };

  patientsData.push(newPatient);
  return newPatient; 
};

export default {
  getEntries,
  addPatient,
};

