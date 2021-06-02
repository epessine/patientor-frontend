import React from 'react';
import axios from 'axios';
import { Icon, SemanticICONS } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";

const SinglePatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  let gender: SemanticICONS;

  const fetchPatient = async () => {
    const { data: res } = await axios.get<Patient>(
      `${apiBaseUrl}/patients/${id}`
    );
    dispatch({ type: "UPDATE_PATIENT", payload: res });
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
      </div>
    );
  }
  return ( <div>patient not found</div> );
};

export default SinglePatientPage;
