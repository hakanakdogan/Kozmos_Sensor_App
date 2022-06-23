import React, { useEffect, useState } from "react";
import { Card, Table, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router";

const SensorSummary = () => {
  const [data, setData] = useState(null);
  const history = useHistory();

  const getData = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/sensorapi/getallsensors`
    );
    setData(data.data);
  };

  useEffect(() => {
    getData();
  }, [data]);

  const onDelete = async (e,id)=>{
    e.preventDefault();
    const response = await axios.delete(`http://localhost:3000/sensorapi/removesensor/${id}`);
    if(response.data.success) {
      const newData = data.filter(x=> x._id !== id);
      setData(newData);
    }
    
  }

  const handleRouting = (id) => {
    history.push(`/kozmos/sensor-details/${id}`, {id});
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Sensör Özet Ekranı</Card.Title>
                <p className="card-category">
                  Bu ekranda eklenen sensörlerin özeti listelenmektedir.
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Sensör Türü</th>
                      <th className="border-0">Sensör Konumu</th>
                      <th className="border-0">Sensör Raporlama Sıklığı</th>
                      <th className="border-0">Aksiyonlar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data != null &&
                      data.map((row) => {
                        return (
                          <tr key={`rowsum-${row._id}`}>
                            <td onClick={() => handleRouting(row._id)}>{row.sensorType}</td>
                            <td onClick={() => handleRouting(row._id)}>{`(${row.x_coordinate},${row.y_coordinate})`}</td>
                            <td onClick={() => handleRouting(row._id)}>{row.frequence}</td>
                            <td>
                              <Button onClick={(e)=>onDelete(e,row._id)} variant="secondary" size="sm">
                                Sil
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SensorSummary;
