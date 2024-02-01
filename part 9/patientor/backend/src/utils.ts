import { NewPatient, Gender, Diagnosis, EntryWithoutId, 
    NewBaseEntry, HealthCheckRating, Discharge, 
    SickLeave } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (label: string, data: unknown): string => {
    if (!data || !isString(data)) {
        throw new Error(`Incorrect or missing ${label}`);
    };

    return data; 
};
  
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

//date and dateOfBirth is the same, then we can use the same method. 
const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
}; 

const parseGender = (gender: unknown): string => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const toNewPatient = (object: unknown): NewPatient => { 
    if ( !object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object 
            && 'gender' in object && 'occupation' in object ) {
        const newEntry: NewPatient = {
            name: parseString('name', object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseString('ssn', object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString('occupation', object.occupation),
        };
        return newEntry; 
    }

    throw new Error('Incorrect data: some fields are missing');
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseRating = (rating: unknown): number => {
    if (!isRating(Number(rating))) {
        throw new Error(`In correct or missing rating: ${rating}`);
    }

    return Number(rating); 
};

const parseDischarge = (object: unknown): Discharge => {
    if ( !object || typeof object !== "object") {
        throw new Error('Incorrect or missing data');
    }

    if ('date' in object && 'criteria' in object) {
        const discharge: Discharge = {
            date: parseDateOfBirth(object.date),
            criteria: parseString('criteria', object.criteria)
        };
        return discharge; 
    }
    
    throw new Error('Incorrect data: a field date/criteria missing');
};

const parseSickLeave = (object: unknown): SickLeave => {
    if ( !object || typeof object !== "object") {
        throw new Error('Incorrect or missing data');
    }

    if ("startDate" in object && "endDate" in object) {
        const sickLeave: SickLeave = {
            startDate: parseDateOfBirth(object.startDate),
            endDate: parseDateOfBirth(object.endDate),
        };

        return sickLeave; 
    }

    throw new Error('In correct data: a field startdate/endate missing ')
};


const toNewEntry = (object: unknown): EntryWithoutId => {
    if ( !object || typeof object !== "object") {
      throw new Error('Incorrect or missing data'); 
    }

    if ( 'description' in object && 'date' in object && 
            'specialist' in object && 'diagnosisCodes' in object) {
        const baseEntry: NewBaseEntry = {
            description: parseString('description', object.description),
            date: parseDateOfBirth(object.date),
            specialist: parseString('description', object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        };
        
        if (!('type' in object) || !isString(object.type)) {
            throw new Error('Missing or invalid entry type');
        }

        switch (object.type) {
            case 'HealthCheck':
                if (!('healthCheckRating' in object)) {
                    throw new Error('Missing: Health Check Rating.');
                } 
                return {
                    ...baseEntry, 
                    type: 'HealthCheck',
                    healthCheckRating: parseRating(object.healthCheckRating),
                };

            case 'Hospital': 
                if (!('discharge' in object)) {
                    throw new Error('Missing discharge');
                }

                return {
                    ...baseEntry, 
                    type: 'Hospital',
                    discharge: parseDischarge(object.discharge)
                };

            case 'OccupationalHealthcare':
                if (!('employerName' in object)) {
                    throw new Error ('Missing employer name');
                }

                if (('sickLeave' in object)) {
                    return {
                        ...baseEntry, 
                        type: 'OccupationalHealthcare',
                        employerName: parseString('employerName', object.employerName), 
                        sickLeave: parseSickLeave(object.sickLeave), 
                    }; 
                } else {
                    return {
                        ...baseEntry, 
                        type: 'OccupationalHealthcare',
                        employerName: parseString('employerName', object.employerName), 
                    };
                }
            
        }
    }

    throw new Error('Incorrect data: some fields are missing');
};

export default { 
    toNewPatient, 
    toNewEntry 
}; 

