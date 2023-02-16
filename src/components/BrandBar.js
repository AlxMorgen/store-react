import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Context } from "..";

const BrandBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <div className="d-flex">
      {device.brands.map((brand) => (
        <Card
          border={brand.id === device.selectedBrand.id ? "danger" : "light"}
          onClick={() => device.setSelectedBrand(brand)}
          className="device_brand p-3"
          key={brand.name}
        >
          {brand.name}
        </Card>
      ))}
      <Button
        variant="outline-gray"
        onClick={() => device.setSelectedBrand("{}")}
      >
        Сброс
      </Button>
    </div>
  );
});

export default BrandBar;
