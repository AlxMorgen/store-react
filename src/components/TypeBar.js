import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { Context } from "..";

const TypeBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <ListGroup>
      {device.types.map((type) => (
        <ListGroup.Item
          className="device_type"
          active={type.id === device.selectedType.id}
          onClick={() => device.setSelectedType(type)}
          key={type.name}
        >
          {" "}
          {type.name}
        </ListGroup.Item>
      ))}
      <ListGroup.Item
        className="device_type"
        onClick={() => device.setSelectedType("{}")}
      >
        Сброс
      </ListGroup.Item>
    </ListGroup>
  );
});

export default TypeBar;
