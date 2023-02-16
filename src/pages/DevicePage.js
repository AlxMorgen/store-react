import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

import bigStar from "../assets/Star-big.png";
import { addDeviceToBasket, fetchOneDevice } from "../http/deviceApi";

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  const addToBasket = () => {
    addDeviceToBasket(device);
  };

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, []);
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + device.img}
          />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2 className="device_name">{device.name}</h2>
            <Row
              className="rate_star d-flex justify-content-center align-items-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                backgroundSize: "cover",
              }}
            >
              {device.rating}
            </Row>
          </Row>
        </Col>
        <Col md={4}>
          <Card className="device_price d-flex flex-column align-items-center justify-content-around">
            <h3>От: {device.price} руб.</h3>
            <Button onClick={addToBasket} variant="outline-dark">
              Добавить в корзину
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className="device_description d-flex flex-column mt-3">
        <h1>Характеристики:</h1>
        {device.info.map((info) => (
          <Col className="device_description-value" key={info.title}>
            {info.title}: {info.description}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DevicePage;
