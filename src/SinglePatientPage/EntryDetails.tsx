import React from 'react';
import { Entry, HealthCheckRating } from '../types';
import { useStateValue } from "../state";
import { assertNever } from '../utils';
import { Card, Icon, SemanticCOLORS } from 'semantic-ui-react';

const EntryDetails = ({entry}: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue();

  const getDiagnosisDescription = (code: string): string => {
    const diagnosis = diagnoses.filter(d => d.code === code);
    return diagnosis[0].name;
  };

  const getHealthCheckColor = (rating: HealthCheckRating): SemanticCOLORS => {
    switch (rating) {
      case 3:
        return 'red';
      case 2:
        return 'orange';
      case 1:
        return 'yellow';
      case 0:
        return 'green';
      default:
        return 'black';
    }
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <Card>
          <Card.Content>
            <Card.Header><Icon name='hospital'/> {entry.date}</Card.Header>
            <Card.Meta>{entry.specialist}</Card.Meta>
            <Card.Description>
              <p>{entry.description}</p>
              <h4>Diagnoses:</h4>
              <ul>
                {entry.diagnosisCodes?.map(code => (
                  <li key={code}>
                    {code}: {getDiagnosisDescription(code)}
                  </li>
                ))}
              </ul>
              <h4>Discharge</h4>
              <p>{entry.discharge.date}: <i>{entry.discharge.criteria}</i></p>
            </Card.Description>
          </Card.Content>
        </Card>
      );
    case "HealthCheck":
      return (
        <Card>
          <Card.Content>
            <Card.Header><Icon name='doctor'/> {entry.date}</Card.Header>
            <Card.Meta>{entry.specialist}</Card.Meta>
            <Card.Description>
              <p>{entry.description}</p>
              {entry.diagnosisCodes ? <h4>Diagnoses:</h4> : null}
              <ul>
                {entry.diagnosisCodes?.map(code => (
                  <li key={code}>
                    {code}: {getDiagnosisDescription(code)}
                  </li>
                ))}
              </ul>
              <Icon 
                color={getHealthCheckColor(entry.healthCheckRating)}
                name='heart'
              />
            </Card.Description>
          </Card.Content>
        </Card>
      );
    case "OccupationalHealthcare":
      return (
        <Card>
          <Card.Content>
            <Card.Header><Icon name='briefcase'/> {entry.date}</Card.Header>
            <Card.Meta>{entry.specialist}</Card.Meta>
            <Card.Description>
              <p><b>Employer:</b> {entry.employerName}</p>
              <p>{entry.description}</p>
              {entry.sickLeave && <p>
                <b>Sick Leave: </b> 
                {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}
              </p>}
            </Card.Description>
          </Card.Content>
        </Card>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;