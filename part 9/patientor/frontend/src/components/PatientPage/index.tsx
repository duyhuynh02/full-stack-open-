import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import { Patient } from "../../types";
import FemaleSharpIcon from '@mui/icons-material/FemaleSharp';
import MaleSharpIcon from '@mui/icons-material/MaleSharp';

const PatientPage = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
        const fetchPatient = async () => {
            const patient = await patientService.fetchById(id);
            setPatient(patient);
        };
        void fetchPatient();
    }, [id]); // Add id as a dependency

    return (
        <div>
            <h1>
              {patient?.name ?? "unknown"}
              {patient?.gender === "male" ? <MaleSharpIcon /> : <FemaleSharpIcon />}
            </h1> 
            <p>{patient?.ssn ?? "N/A"}</p>
            <p>{patient?.occupation ?? "N/A"}</p>
        </div>
    );
};

export default PatientPage; 