import React, { useEffect, useState } from "react";
import "./popularproduct.css";
import { Container, Row } from "reactstrap";
import Popularproductcard from "./popularproductcard";
export default function Popularproduct(props) {
  const onItemSelect = props.onItemSelect;
  const onItemDeSelect = props.onItemDeSelect;
  const [Products,SetProducts] = useState(props.products)
  const checkInclusion = (item) =>{
    return props.shoppingList.includes(item);
  }


  
  return (
    <Container className="popular-product-container">
      <Row>
        <h1 className="for-you-header">
          Popular <span className="for-you-rectangle">Now</span>
        </h1>
      </Row>
      <Container className="card-list-container">
        {Products.map((product) => (
          <Popularproductcard
            product={product}
            onItemSelect={(item) => {
              onItemSelect(item);
            }}
            onItemDeSelect={(item) => {
              onItemDeSelect(item);
            }}
            checkInclusion={checkInclusion(product)}
          ></Popularproductcard>
        ))}
      </Container>
    </Container>
  );
}
