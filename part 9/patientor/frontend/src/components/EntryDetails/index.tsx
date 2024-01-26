import { Entry } from "../../types";
import { LocalHospital, MonitorHeart, HealthAndSafety } 
    from '@mui/icons-material/';


const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled entry: ${JSON.stringify(value)}`
    );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <LocalHospital />;
        case "HealthCheck": 
            return <MonitorHeart />;
        case "OccupationalHealthcare":
            return <HealthAndSafety />;
        default:
            return assertNever(entry); 
    } 
};

export default EntryDetails;