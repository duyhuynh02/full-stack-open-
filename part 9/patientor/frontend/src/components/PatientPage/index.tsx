import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import { Diagnosis, Patient } from "../../types";
import { MaleSharp, FemaleSharp } from '@mui/icons-material/';
import EntryDetails from "../EntryDetails";

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
              {patient?.gender === "male" ? <MaleSharp /> : <FemaleSharp />}
            </h1> 
            <p>ssn: {patient?.ssn ?? "N/A"}</p>
            <p>occupation: {patient?.occupation ?? "N/A"}</p>
            <h2>entries</h2>
            {patient?.entries.map(e => (
                <ul key={e.id} style={{listStyleType: "none"}}>
                    <li>{e.date} <EntryDetails entry={e}/> </li> 
                    <li>{e.description}</li>
                    <li>diagnosed by {e.specialist}</li> 
                </ul>
            ))}
        </div>
    );
};

export default PatientPage; 