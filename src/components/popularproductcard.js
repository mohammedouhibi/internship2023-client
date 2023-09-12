import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  Col,
  Row,
} from "reactstrap";
import "./popularproductcard.css";

export default function Popularproductcard(props) {


  return (
    <Card className="product-card">
      <div className="product-card-container">
        <img 
          src={require("./assets/" + props.product.imgName)}
          className="product-card-img"
        />
 
        <CardBody>
          <Row>
            <div className="productbodycontainer">
              <div className="productcardtext">{props.product.name}</div>
              <div className="productcardtext">{props.product.reviews}</div>
            </div>
          </Row>
          <Row>
            <Col
              xs={{
                offset: 0,
                size: "7",
              }}
            >
              <div className="card-buttons-container">
                <button className="hot-button">
                  <div className="hot-button-text">Hot</div>
                </button>
                <button className="cold-button">
                  <div className="cold-button-text">Cold</div>
                </button>
              </div>
            </Col>
            <Col
              xs={{
                offset: 2,
                size: "1",
              }}
            >
             {!props.checkInclusion ? (<div
                className="product-card-cart-filled"
                onClick={() => {props.onItemSelect(props.product); }}
              >
                <img
                  src={require("./assets/cart-white.png")}
                  style={{ width: "18px", height: "17px", flexShrink: "0" }}
                />
              </div>):
              (<div
                className="product-card-cart-empty"
                onClick={() => {props.onItemDeSelect(props.product);}}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="17"
                  viewBox="0 0 19 17"
                  fill="none"
                >
                  <path
                    d="M4.17084 4.33325H15.6625C15.8954 4.33326 16.1256 4.38206 16.3385 4.47651C16.5513 4.57095 16.742 4.70895 16.8982 4.8816C17.0545 5.05425 17.1728 5.25772 17.2456 5.4789C17.3184 5.70008 17.344 5.93406 17.3208 6.16575L16.8208 11.1658C16.7797 11.577 16.5873 11.9583 16.2808 12.2356C15.9744 12.513 15.5758 12.6666 15.1625 12.6666H7.20417C6.81873 12.6667 6.44515 12.5333 6.14704 12.289C5.84893 12.0446 5.64472 11.7045 5.56917 11.3266L4.17084 4.33325Z"
                    stroke="#FF902A"
                    stroke-width="2"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.3375 16H15.0042M4.17084 4.33333L3.49584 1.63083C3.45069 1.45063 3.34663 1.29067 3.20018 1.17638C3.05372 1.06209 2.87328 1 2.6875 1H1.67084L4.17084 4.33333ZM6.67084 16H8.3375H6.67084Z"
                    stroke="#FF902A"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>)}
            </Col>
          </Row>
        </CardBody>
      </div>
    </Card>
  );
}
