import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import { Diagnosis, Patient } from "../../types";
import FemaleSharpIcon from '@mui/icons-material/FemaleSharp';
import MaleSharpIcon from '@mui/icons-material/MaleSharp';

const PatientPage = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnosis, setDiagnosis] = useState<Diagnosis[] | []>([]);

    useEffect(() => {
        const fetchPatient = async () => {
            const patient = await patientService.fetchById(id);
            setPatient(patient);
            // console.log('patient: ', patient);
        };

        const fetchDiagnosis = async () => {
            const allDiagnosis = await patientService.getAllDiagnosis();
            setDiagnosis(allDiagnosis); 
            // console.log(diagnosis);
        };

        void fetchPatient();
        void fetchDiagnosis();
    }, [id]); // Add id as a dependency

    return (
        <div>
            <h1>
              {patient?.name ?? "unknown"}
              {patient?.gender === "male" ? <MaleSharpIcon /> : <FemaleSharpIcon />}
            </h1> 
            <p>ssn: {patient?.ssn ?? "N/A"}</p>
            <p>occupation: {patient?.occupation ?? "N/A"}</p>
            <h2>entries</h2>
            <p>{patient?.entries[0].date ?? "N/A"} {patient?.entries[0].description}</p>
            <p>
                {patient?.entries[0].diagnosisCodes.map(e => {
                    const diagnosisObj = diagnosis.find(obj => obj.code === e);
                    return diagnosisObj ? <li key={e}>{e} {diagnosisObj.name}</li> : "N/A";
                })}
            </p>
        </div>
    );
};

export default PatientPage; 