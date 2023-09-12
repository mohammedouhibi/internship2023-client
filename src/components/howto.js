import React from "react";
import { Col, Container, Row } from "reactstrap";
import "./howto.css";
export default function Howto() {
  return (
    <Container className="how-to-container">
      <Row>
        <div className="how-to-box">
          <div className="how-to-text">
            How to use delivery{" "}
            <span className="how-to-rectangle">service</span>
          </div>
        </div>
      </Row>
      <Row xs="4" className="frames-container">
        <Col>
          <div className=" box1">
            <div className="image1-container">
              <img
                src={require("./assets/coffee-how-to.png")}
                className="coffee-cup1"
              />
              <img
                src={require("./assets/hand-how-to.png")}
                className="pointing-hand1"
              />
            </div>
            <div className="box1-text-container">
              <h className="box1-header">choose your coffee</h>
              <p className="box1-content">there are 20+ coffees for you</p>
            </div>
          </div>
        </Col>
        <Col>
          <div className=" box1">
            <div>
              <img
                src={require("./assets/food-truck.png")}
                className="food-truck"
              />
            </div>
            <div className="box1-text-container">
              <h className="box1-header">we delivery it to you</h>
              <p className="box1-content">Choose delivery service</p>
            </div>
          </div>
        </Col>
        <Col>
          <div className="box1">
            <img
              src={require("./assets/coffee-how-to.png")}
              className="coffee-cup2"
            />

            <div className="box1-text-container">
              <h className="box1-header">Enjoy your coffee</h>
              <p className="box1-content">Choose delivery service</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
