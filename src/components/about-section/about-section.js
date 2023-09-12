import React from "react";
import "./about-section.css";
import { Col, Container } from "reactstrap";

export default function Aboutsection() {
  return (
    <Container fluid className="about-section-container">
      <div className="about-section-box">
        <Container>
          <div className="about-section-content">
            <Col xs="3">
              <div className="about-image-container shadow">
                <img
                  src={require("../assets/coffee-about.jpg")}
                  className="image1"
                />
              </div>
            </Col>
            <Col
              xs={{
                offset: 2,
                size: "4",
              }}

              className="text-column"
            >
              <div className="about-">
                <h1 className="about-header">
                About <span className="about-rectangle">us</span>
                </h1>
                <p className="about-sub-header">
                We provide quality coffee, and ready to deliver.
                </p>
                <p className="about-text">
                We are a company that makes and distributes delicious drinks. our main product is made with a secret recipe and available in stores worldwide.
                </p>
                <a href="#" className="get-button">Get your coffee</a>
              </div>
            </Col>
          </div>
        </Container>
      </div>
    </Container>
  );
}
