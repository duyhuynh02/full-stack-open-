import patientsData from '../data/patients';

import { nonSSNPatient } from '../types';

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

export default {
  getEntries,
};

