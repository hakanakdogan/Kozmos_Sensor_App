import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Table, Card, ListGroup } from "react-bootstrap";

const SensorDetails = () => {
  const location = useLocation();
  const [initialInfo, setInitialInfo] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/sensorapi/getsensorbyid/${location.state.id}`)
      .then((response) => {
        if (response.data.success) {
          setInitialInfo(response.data.data);
          intervalRun(response.data.data.frequence);
        }
      });
  }, []);

  const intervalRun = (frequence) => {
    setInterval(() => {
      axios
        .get(
          `http://localhost:3000/sensorapi/getsensorbyid/${location.state.id}`
        )
        .then((response) => {
          if (response.data.success) {
            setInitialInfo(response.data.data);
          }
        });
    }, frequence * 1000);
  };

  return (
    <>
    {
        initialInfo &&
        <Card>
        <Card.Body>
          <Card.Text>
            <center><b>Sensör Bilgileri</b></center>
          </Card.Text>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <b>Tür:</b> {initialInfo.sensorType}
            </ListGroup.Item>
            <ListGroup.Item>
              <b>X Ekseni:</b> {initialInfo.x_coordinate}
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Y Ekseni:</b> {initialInfo.y_coordinate}
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Frekans:</b> {initialInfo.frequence}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    }

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Tarih</th>
            <th>Veri</th>
          </tr>
        </thead>
        <tbody>
          {initialInfo &&
            initialInfo.sensorLogs &&
            initialInfo.sensorLogs.map((log) => {
              return (
                <tr>
                  <td>{log.date}</td>
                  <td>{log.value}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default SensorDetails;
