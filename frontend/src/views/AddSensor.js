import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Badge,
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
  Form,
  Alert,
} from "react-bootstrap";



const AddSensor = () => {
  const [sensorSayisi, setSensorSayisi] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [frequence, setFrequence] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isMapAvailable, setIsMapAvailable] = useState(false);

  const [sensorTypes, setSensorTypes] = useState([
    { id: 1, value: "Duman" },
    { id: 2, value: "CO2" },
    { id: 3, value: "Metan" },
    { id: 4, value: "Toz" },
    { id: 5, value: "O2" },
  ]);

  useEffect(() => {
    const getIsMapAdded = async () => {
      const response = await axios.get(`http://localhost:3000/sensorapi/getmap`);
      console.log("useEffectten geldi");
      console.log(response.data);
      if (response.data.length === 0) {
        setIsMapAvailable(false);
      }
      else {
        setIsMapAvailable(true);
      }
    }
    getIsMapAdded();
  }, [])



  const handleChange = (e) => {
    setSensorSayisi([]);
    let sensorler = [];
    for (let i = 0; i < e.target.value; i++) {
      sensorler.push({
        x: 0,
        y: 0,
        tur: "Duman"
      });
    }

    setSensorSayisi(sensorler);
  };

  const addData = async (e) => {
    e.preventDefault();
    const response = await axios.get(`http://localhost:3000/sensorapi/getmap`);
    console.log(response);



    setIsLoading(true);
    for (let i = 0; i < sensorSayisi.length; i++) {
      const sensor = sensorSayisi[i];
      await axios.post(`http://localhost:3000/sensorapi/newSensor`, {
        x_coordinate: sensor.x,
        y_coordinate: sensor.y,
        frequence: frequence,
        sensorType: sensor.tur,
      });
    }
    setIsLoading(false);
  };

  const onTypeChangeMethod = (e, index) => {
    let item = sensorSayisi[index];
    item.tur = e.target.value;
    setSensorSayisi(sensorSayisi);
    console.log(sensorSayisi)
  }

  const onXChangeMethod = (e, index) => {
    let item = sensorSayisi[index];
    item.x = e.target.value;
    setSensorSayisi(sensorSayisi);
    console.log(sensorSayisi)
  }

  const onYChangeMethod = (e, index) => {
    let item = sensorSayisi[index];
    item.y = e.target.value;
    setSensorSayisi(sensorSayisi);
    console.log(sensorSayisi)
  }

  return (
    <>
      {
        isMapAvailable ? (
          <Container fluid>
            <Row>
              <Col md="12">
                {isLoading ? (
                  <Card>
                    <Card.Header>
                      <Card.Title>Yükleniyor</Card.Title>
                    </Card.Header>

                  </Card>
                ) : (
                  <Card.Body>
                    <Form>
                      <Row>
                        <Col className="pl-1" md="4">
                          <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Sensör Sayısı Giriniz:</Form.Label>
                            <Form.Control
                              as="select"
                              defaultValue="0"
                              onChange={(e) => handleChange(e)}
                            >
                              <option value={"0"}>0</option>
                              <option value={"1"}>1</option>
                              <option value={"2"}>2</option>
                              <option value={"3"}>3</option>
                              <option value={"4"}>4</option>
                              <option value={"5"}>5</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Table striped bordered hover variant="light">
                        <thead>
                          <tr>
                            <th>Sensör Türü</th>
                            <th>X Koordinatı</th>
                            <th>Y Koordinatı</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sensorSayisi != undefined &&
                            sensorSayisi.map((sensor, index) => {
                              return (
                                <tr key={`add-sensor-${index}`}>
                                  <td className="pl-1" md="4">
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                      <Form.Control
                                        as="select"
                                        defaultValue="Duman"
                                        onChange={(e) => onTypeChangeMethod(e, index)}
                                      >
                                        {sensorTypes != undefined &&
                                          sensorTypes.map((sensorType) => {
                                            return (
                                              <option
                                                key={"sensortype-" + sensorType.id}
                                                value={sensorType.value}
                                              >
                                                {sensorType.value}
                                              </option>
                                            );
                                          })}
                                      </Form.Control>
                                    </Form.Group>
                                  </td>
                                  <td className="pr-1" md="5">
                                    <Form.Group>
                                      <Form.Control
                                        defaultValue={sensor.x}
                                        type="number"
                                        onChange={e => onXChangeMethod(e, index)}
                                      ></Form.Control>
                                    </Form.Group>
                                  </td>
                                  <td className="px-1" md="3">
                                    <Form.Group>
                                      <Form.Control
                                        defaultValue={sensor.y}
                                        type="number"
                                        onChange={e => onYChangeMethod(e, index)}
                                      ></Form.Control>
                                    </Form.Group>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>

                      {sensorSayisi?.length > 0 && (
                        <Form.Group>
                          <Form.Label>Raporlama Sıklığını Giriniz:</Form.Label>
                          <Form.Control
                            defaultValue={frequence}
                            type="number"
                            onChange={(e) => setFrequence(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      )}

                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                        onClick={(e) => addData(e)}
                      >
                        Sensörleri ekle
                      </Button>

                      <br />

                      {alertMessage.length > 0 && (
                        <Alert key={variant} variant={variant}>
                          {alertMessage}
                        </Alert>
                      )}

                      <div className="clearfix"></div>
                    </Form>
                  </Card.Body>
                )}
              </Col>
            </Row>
          </Container>
        ) : (
          <Card>
            <Card.Body>
              <Card.Text>
                Harita Eklenmeden Sensör Eklenemez. Lütfen Önce Bir Harita Ekleyin.
              </Card.Text>

            </Card.Body>
          </Card>
        )
      }

    </>
  );
};

export default AddSensor;
