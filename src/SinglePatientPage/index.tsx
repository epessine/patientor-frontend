import React from 'react';
import axios from 'axios';
import { Icon, SemanticICONS } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { updatePatient } from "../state/reducer";

const SinglePatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  let gender: SemanticICONS;

  const fetchPatient = async () => {
    const { data: res } = await axios.get<Patient>(
      `${apiBaseUrl}/patients/${id}`
    );
    dispatch(updatePatient(res));
  };
  if (!patients[id] || !patients[id].ssn) void fetchPatient();
  const patient = patients[id];

  if (patient) {
    switch (patient.gender) {
      case 'male':
        gender = 'mars';
        break;
      
      case 'female':
        gender = 'venus';
        break;
    
      default:
        gender = 'genderless';
        break;
    }
    return (
      <div>
        <h2>
          {patient.name}
          <Icon disabled name={gender} />
        </h2>
        <p><b>ssn: {patient.ssn}</b></p>
        <p><b>occupation: {patient.occupation}</b></p>
        <h3>entries</h3>
        {patient.entries.map(entry => (
          <div key={entry.id}>
            <p>{entry.date} <i>{entry.description}</i></p>
            <ul>
              {entry.diagnosisCodes?.map(code => (
                <li key={code}>
                  {code}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  return ( <div>patient not found</div> );
};

export default SinglePatientPage;
