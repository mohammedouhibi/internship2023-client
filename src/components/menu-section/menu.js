import React, { useState } from "react";
import { Container, Row } from "reactstrap";
import "./menu.css";
import Menucard from "./menucard";

export default function Menu(props) {
  const onItemSelect = props.onItemSelect;
  const onItemDeSelect = props.onItemDeSelect;
  const [Products,SetProducts] = useState(props.products)
  const checkInclusion = (item) =>{
    return props.shoppingList.includes(item);
  }



  return (
    <Container className="for-you-container">
      <Row>
        <h1 className="for-you-header">
          Special menu <span className="for-you-rectangle">for you</span>
        </h1>
      </Row>
      <Row className="menu-cards-container">
        {Products.map((product) => (
          <Menucard 
          product={product}
          onItemSelect={(item) => {
            onItemSelect(item);
          }}
          onItemDeSelect={(item) => {
            onItemDeSelect(item);
          }}
          checkInclusion={checkInclusion(product)}
          
          ></Menucard>
        ))}
      </Row>
    </Container>
  );
}
