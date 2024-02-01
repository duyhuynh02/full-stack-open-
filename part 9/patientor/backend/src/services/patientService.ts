import patientsData from '../data/patients';
import { Patient, NewPatient, nonSSNPatient, EntryWithoutId, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientsData;
// console.log(patientsData)

const getEntries = (): nonSSNPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findById = (id: string): Patient | undefined => {
    const patientEntry = patients.find(p => p.id === id);
    return patientEntry;
};

const addPatient = (patient: NewPatient): Patient => {
    const id = uuid();
    const newPatient = {
      id,
      entries: [],
      ...patient
    };

  patientsData.push(newPatient);
  return newPatient; 
};

const addEntry = (patientEntry: Patient, entry: EntryWithoutId): Entry => {
  const id = uuid();
  const newEntry = {
    id, 
    ...entry
  }; 
  patientEntry.entries.push(newEntry);

  return newEntry; 
};

export default {
  getEntries,
  addPatient,
  findById,
  addEntry
};

