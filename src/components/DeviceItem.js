import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Image, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "..";

import star from "../assets/star.png";
import { fetchBrand } from "../http/deviceApi";

import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({ devices }) => {
  const [brand, setIsBrand] = useState();
  const [loader, setIsLoader] = useState(true);
  const { device } = useContext(Context);
  const openDevice = () => {
    navigate(DEVICE_ROUTE + "/" + devices.id);
    device.setPage(1);
  };
  useEffect(() => {
    fetchBrand().then((data) => {
      setIsBrand(data);
      setIsLoader(false);
    });
  }, []);
  const brandId = devices.brandId;
  let currentBrand;
  const navigate = useNavigate();

  if (typeof brand === "object") {
    currentBrand = brand.filter((brand) => brand.id === brandId)[0].name;
  }

  return (
    <Col md={3} className="mt-3">
      {loader ? (
        <Spinner />
      ) : (
        <Card onClick={openDevice} className="device_item">
          <Image
            width={150}
            height={150}
            src={process.env.REACT_APP_API_URL + devices.img}
          />
          <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
            <div>{currentBrand}</div>
            <div className="d-flex align-items-center">
              <div>{devices.rating}</div>
              <Image width={18} height={18} src={star} />
            </div>
          </div>
          <div>{devices.name}</div>
        </Card>
      )}
    </Col>
  );
};

export default DeviceItem;
