import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../..";
import { createDevices, fetchBrand, fetchTypes } from "../../http/deviceApi";

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [info, setInfo] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  // const [brand, setBrand] = useState(null);
  // const [type, setType] = useState(null);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrand().then((data) => device.setBrands(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter((filter) => filter.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brandId", device.selectedBrand.id);
    formData.append("typeId", device.selectedType.id);
    formData.append("info", JSON.stringify(info));

    createDevices(formData).then((data) => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новое устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown className="mb-2">
          <Dropdown.Toggle>
            {device.selectedType.name || "Выберите тип"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {device.types.map((type) => (
              <Dropdown.Item
                onClick={() => device.setSelectedType(type)}
                key={type.name}
              >
                {type.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="mb-2">
          <Dropdown.Toggle>
            {device.selectedBrand.name || "Выберите бренд"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {device.brands.map((brand) => (
              <Dropdown.Item
                onClick={() => device.setSelectedBrand(brand)}
                key={brand.name}
              >
                {brand.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2"
          placeholder="Введите название устройства"
        ></Form.Control>
        <Form.Control
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="mb-2"
          placeholder="Введите стоимость устройства"
          type="number"
        ></Form.Control>
        <Form.Control
          onChange={selectFile}
          className="mb-2"
          type="file"
        ></Form.Control>
        <hr />
        <Button onClick={addInfo} variant="outline-dark">
          Добавить новое свойство
        </Button>
        {info.map((el) => (
          <Row key={el.number}>
            <Col md={4}>
              <Form.Control
                value={el.title}
                onChange={(e) => changeInfo("title", e.target.value, el.number)}
                placeholder="Введите название"
              />
            </Col>
            <Col md={4}>
              <Form.Control
                value={el.description}
                onChange={(e) =>
                  changeInfo("description", e.target.value, el.number)
                }
                placeholder="Введите описание"
              />
            </Col>
            <Col md={4}>
              <Button
                onClick={() => removeInfo(el.number)}
                variant="outline-danger"
              >
                Удалить свойство
              </Button>
            </Col>
          </Row>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
