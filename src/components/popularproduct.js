import React, { useEffect, useState } from "react";
import "./popularproduct.css";
import { Container, Row } from "reactstrap";
import Popularproductcard from "./popularproductcard";
export default function Popularproduct(props) {
  const checkInclusion = (item) => {
    return (
      props.shoppingList.filter(
        (product) => product.productId === item.productId
      ).length > 0
    );
  };

  return (
    <Container className="popular-product-container">
      <Row>
        <h1 className="for-you-header">
          Popular <span className="for-you-rectangle">Now</span>
        </h1>
      </Row>
      <Container className="card-list-container">
        {props.products.map((product) => (
          <Popularproductcard
          updateCartItem={(temperature,quantity ) => {
            const ci = props.shoppingList.filter(
              (p) => p.productId === product.productId
            )[0]
            ci.temperature = temperature
            ci.quantity = quantity
            props.updateCartItem(ci)
          }}
            temperature={() => {
              if (checkInclusion(product)) {
                return props.shoppingList.filter(
                  (p) => p.productId === product.productId
                )[0].temperature;
              }else{return undefined}
            }}
            quantity={() => {
              if (checkInclusion(product)) {
                console.log(product.name+props.shoppingList.filter(
                  (p) => p.productId === product.productId
                )[0].quantity)
                return props.shoppingList.filter(
                  (p) => p.productId === product.productId
                )[0].quantity;
              }else{return undefined}
            }}
            product={product}
            onItemSelect={props.onItemSelect}
            onItemDeSelect={(item) => {
              props.onItemDeSelect(
                props.shoppingList.filter(
                  (product) => product.productId === item.productId
                )[0]
              );
            }}
            checkInclusion={()=>checkInclusion(product)}
          ></Popularproductcard>
        ))}
      </Container>
    </Container>
  );
}
