import React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { Heroimj } from "./items/Heroimg";
import "./hero.css";

export default function Hero() {
  return (
    <Container
      fluid
      style={{ backgroundColor: "#F6EBDA", paddingTop: "100px", height:"130vh", position:"relative", zIndex:-2 }}
    >


        <Container className="hero-container">
          <div className="coffee-beans" />
          <Row>
            <Col
              xs={{
                offset: 0,
                size: "5",
              }}
            >
              <div className="HeroContentHeader">
                Enjoy your <span class="coffee">coffee</span> before your
                activity
              </div> 
              <br></br>
              <div className="HeroSubHeader">
                Boost your productivity and build your mood with a glass of
                coffee in the morning
              </div>
              <br></br>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  alignContent: "space-evenly",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "#2F2105",
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 32px",
                  }}
                  className="rounded-pill "
                >
                  <a color="#FFFFFF">Order Now </a>
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      backgroundColor: "#FF902B",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: "8px",
                    }}
                  >
                    <img
                      src={require("./assets/cart-white.png")}
                      style={{ width: "12px", height: "12px", flexShrink: "0" }}
                    />
                  </div>
                </Button>
                <div className="more-menu-button">
                  <div className="more-menu-text">More menu</div>
                </div>
              </div>
            </Col>

            <Col
              xs={{
                offset: 2,
                size: "4",
              }}
            >
              <Heroimj></Heroimj>
            </Col>
          </Row>
        </Container>
    </Container>
  );
}
