import React, { useEffect, useState } from "react";
import "./order-row.css";

export default function OrderRow(props) {
  const [temperature, setTemperature] = useState(props.cartItem.temperature);
  const [quantity, setQuantity] = useState(props.cartItem.quantity);
  const handleChange = (event) => {
    if (event.target.value > 99) {
      setQuantity(99);
    } else if (event.target.value < 1) {
      setQuantity(1);
    } else {
      setQuantity(event.target.value);
    }
  };

  const incrementQuantity = (value) => {
    if (quantity + value > 99) {
      setQuantity(99);
    } else if (quantity + value < 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity + value);
    }
  };

  useEffect(() => {
    props.updateCartItem(temperature, quantity);
  }, [temperature, quantity]);
  return (
    <tr key={props.cartItem.product.name}>
      <td className="order-product-column">
        <img
          src={require("../assets/" + props.cartItem.product.image)}
          className="order-product-image"
        />
      </td>
      <td>
        <div className="order-description-column">
          <div>{props.cartItem.product.name}</div>
          <div>{props.cartItem.product.description}</div>
        </div>
      </td>
      <td>{props.cartItem.temperature === 0 ? "Hot" : "Cold"}</td>
      <td>{props.cartItem.product.price}</td>
      <td className="order-quantity-input-column">
        <div className="order-quantity-input-container">
          <div
            className="order-triangle-up"
            onClick={() => incrementQuantity(1)}
          ></div>

          <input
            type="number"
            className="order-quantity-input"
            min="1"
            max="99"
            value={quantity}
            onChange={handleChange}
          />

          <div
            className="order-triangle-down"
            onClick={() => incrementQuantity(-1)}
          ></div>
        </div>
      </td>
      <td>{props.cartItem.quantity * props.cartItem.product.price+"$"}</td>
    </tr>
  );
}
