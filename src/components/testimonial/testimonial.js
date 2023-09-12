import React from "react";
import "./testimonial.css";
import { Col, Container, Row } from "reactstrap";
import Testimonialcard from "./testimonialcard";

export default function Testimonial() {
  return (
    <div className="testimonial-container">
        <div className="testimonial-background" >  </div>
        <Container>
        <Row>
        <Col xs='2'>
        <div className="testimonial-text-container container">
        
        <p className="testimonial-sub-header">What they say about us</p>
        <p className="testimonial-text">
          We always provide the best service and always maintain the quality of
          coffee
        </p>
      </div>
      </Col>
      <Col xs={{
        offset:2,
        size:5
      }}>
      <div className="testimonial-cards-container">
        {[1,2,3].map(()=>(<div className="card-box"><Testimonialcard /></div>))}  
      </div>
      </Col>
      </Row>
      </Container>
    </div>
  );
}
