import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DeviceItem from "../components/DeviceItem";

const Basket = () => {
  const [cart, setCart] = useState([]);

  const deleteFromCart = (el) => {
    setCart(cart.filter((value) => el !== value));

    fetch("/api/basket", {
      method: "DELETE",
      body: JSON.stringify(el),
    }).then((res) => res.json());
  };

  useEffect(() => {
    fetch("/api/basket")
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  return (
    <Container>
      <Row className="d-flex justify-content-space-between">
        {cart.map((el) => (
          <Col key={el.name} md={3}>
            <DeviceItem devices={el} />
            <Button onClick={() => deleteFromCart(el)} className="mr-0">
              Удалить
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Basket;
