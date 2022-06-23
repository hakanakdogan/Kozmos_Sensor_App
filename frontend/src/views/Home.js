import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Form, Container, Row, Col, ListGroup } from "react-bootstrap";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMapAdded, setIsMapAdded] = useState(false);

  const getData = async () => {
    const request = await axios.get(`http://localhost:3000/sensorapi/getmap`);
    setIsMapAdded(request.data.length == 0 ? false : true)
    console.log("getdatadan gelen:")
    console.log(data);
    setData(request.data[0]);
  };



  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/sensorapi/newmap", {

      radius: data.radius,
      x_coordinate: data.x_coordinate,
      y_coordinate: data.y_coordinate

    })
    await getData();
  };
  console.log("DATA:");
  console.log(data);
  {
    return loading ? (
      <span>YÜKLENİYOR...</span>
    ) : (
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              {isMapAdded === false ? (
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">Harita Bilgileri</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={(e) => onSubmit(e)}>
                      <Row>
                        <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>X Koordinatı</label>
                            <Form.Control
                              placeholder="harita merkezinin x koordinatı"
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  x_coordinate: e.target.value,
                                })
                              }
                              type="number"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="px-1" md="6">
                          <Form.Group>
                            <label>Y Koordinatı</label>
                            <Form.Control
                              placeholder="harita merkezinin y koordinatı"
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  y_coordinate: e.target.value,
                                })
                              }
                              type="number"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="" md="6">
                          <Form.Group>
                            <label>Harita Yarıçapı</label>
                            <Form.Control
                              placeholder="harita yarıçapı"
                              onChange={(e) =>
                                setData({ ...data, radius: e.target.value })
                              }
                              type="number"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="" md="6">
                          <br />
                          <Button
                            className="btn-fill btn-block pull-right"
                            type="submit"
                            variant="info"
                          >
                            Harita Ekle
                          </Button>
                        </Col>
                      </Row>

                      <div className="clearfix"></div>
                    </Form>
                  </Card.Body>
                </Card>
              ) : (

                data == null ? (
                  <span>YÜKLENİYOR...</span>
                ) :
                  (
                    <Card>
                      <Card.Body>
                        <Card.Text>
                          Daha önceden zaten bir harita eklenmiş. Eklenen haritanın
                          bilgileri:
                        </Card.Text>
                        <ListGroup variant="flush">
                          <ListGroup.Item><b>X Ekseni:</b> {data.x_coordinate}</ListGroup.Item>
                          <ListGroup.Item><b>Y Ekseni:</b> {data.y_coordinate}</ListGroup.Item>
                          <ListGroup.Item><b>Yarıçap:</b> {data.radius}</ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  )


              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
};

export default Home;
