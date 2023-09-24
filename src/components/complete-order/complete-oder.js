import React, { useEffect, useState } from "react";
import "./complete-oder.css";
import { Button, Container, Table } from "reactstrap";
import OrderRow from "./order-row";
import OrderAddress from "./order-address";
import { states } from "./states.json";
import fetchWithAuth from "../../fetch-interceptor";
import { json } from "react-router-dom";
import { TemplateRef } from "@angular/core";
import toast from "react-hot-toast";

export default function CompleteOder(props) {
  const [total, setTotal] = useState(0);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    zip: "",
    state: "",
    address: "",
    phone: "",
    info: "",
    cartItemIds: [],
  });
  const [error, setError] = useState({
    zip: "",
    state: "",
    address: "",
    phone: "",
  });

  const validateForm = () => {
    let err = {
      zip: "",
      state: "",
      address: "",
      phone: "",
    };
    formData.zip.toString().length !== 4
      ? (err.zip = "Zip code must be 4 digits")
      : (err.zip = "");
    formData.address.length === 0
      ? (err.address = "Address is required")
      : (err.address = "");
    formData.phone.toString().length !== 8
      ? (err.phone = "Phone number must be 8 digits")
      : (err.phone = "");
    formData.state.length === 0
      ? (err.state = "State is required")
      : (err.state = "");

    setError(err);

    return (
      formData.zip.toString().length === 4 &&
      formData.address.length > 0 &&
      formData.phone.toString().length === 8 &&
      formData.state.length > 0
    );
  };

  const getOrderTemplate = async () => {
    const response = await fetchWithAuth(
      "https://localhost:7289/Orders/get-order-template",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const template = await response.json();
      setFormData((prev) => {
        return {
          ...template,
          cartItemIds: prev.cartItemIds,
        };
      });
    }
  };

  const handleSubmit = async () => {
    let CartItemIds = [];
    props.shoppingList.forEach((item) => {
      CartItemIds.push(item.cartItemId);
    });
    setFormData({ ...formData, cartItemIds: CartItemIds });
    alert(JSON.stringify(formData.cartItemIds));

    try {
      const response = await fetchWithAuth(
        "https://localhost:7289/Orders/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("success");
      }
    } catch (error) {
      console.error(error);
    }
  };


  function formatNumber(value) {

    // Convert to string if number
    let numberStr = typeof value === 'number' ? value.toString() : value;
  
    // Validate length
    if(numberStr.length !== 8) {
      throw new Error('Input value must have 8 digits');
    }
  
    // Split into 3 parts
    let part1 = numberStr.substring(0, 2); 
    let part2 = numberStr.substring(2, 5);
    let part3 = numberStr.substring(5);
  
    // Join with spaces
    return part1 + " " + part2 + " " + part3;
  
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    let tot = 0;
    props.shoppingList.forEach((item) => {
      tot += item.product.price * item.quantity;
    });
    setTotal(tot);
  }, [props.shoppingList]);

  const handleSteps = () => {
    if (step === 1) {
      toast.success('Successfully toasted!')
      getOrderTemplate();
      setStep(step + 1);
    } else if (step === 2) {
      if (validateForm()) {
        setStep(step + 1);
      }
    } else if (step === 3) handleSubmit();
  };

  return (
    <div className="order-page">
    <Container className="complete-oder-container">
      <div className="order-box shadow ">
        <div className="order-steps">
          <ul className="order-steps-list">
            <li
              className={`order-steps-list-item seperated ${
                step === 1 ? "active" : ""
              } ${step > 1 ? "activated" : ""}`}
              onClick={() => {
                if (step > 1) setStep(1);
              }}
            >
              Verify your order
            </li>
            <li
              className={`order-steps-list-item seperated ${
                step === 2 ? "active" : ""
              }  ${step > 2 ? "activated" : ""}`}
              onClick={() => {
                if (step > 2) setStep(2);
              }}
            >
              Delivery details
            </li>
            <li
              className={`order-steps-list-item  ${step === 3 ? "active" : ""}`}
            >
              Confirm order
            </li>
          </ul>
        </div>
        {step === 1 && (
          <div className="order-table-box">
            <Table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Description</th>
                  <th>Temperature</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {props.shoppingList.map((ci) => (
                  <OrderRow
                    cartItem={ci}
                    updateCartItem={(temperature, quantity) => {
                      ci.temperature = temperature;
                      ci.quantity = quantity;
                      props.updateCartItem(ci);
                    }}
                  />
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {step === 2 && (
          <div>
            <OrderAddress
              formData={formData}
              handleChange={handleChange}
              error={error}
            ></OrderAddress>
          </div>
        )}
        {step === 3 && (
          <div className="order-summary-box">
            <div className="order-summary-item-list">
            <h3 className="order-summary-header">Does this look right?</h3>
            {props.shoppingList.map((ci) => (
              <div className="order-summary-row">
                <div>{ci.product.name + " x" + ci.quantity}</div>
                <div>{ci.product.price}$</div>
              </div>
            ))}
            </div>
            <div className="order-summary-delivery-details-box">
              <ul className="order-summary-delivery-details">
                <li>State: {formData.state}</li>
                <li>Delivery to: {formData.address}</li>
                <li>Zip: {formData.zip}</li>
                <li>Phone: +216 {formatNumber(formData.phone)}</li>
              </ul>
            </div>
          </div>
        )}
        <div className="order-total-container">
          {step === 3 && <Button onClick={() => setStep(1)}>Back</Button>}
          <Button onClick={handleSteps} className="steps-button">
            {step < 3 ? "Continue" : "Confirm order"}
          </Button>
          {(step === 1 || step === 3) && (
            <div className="grand-total">
              Grand total: <span className="order-total">{total}$</span>
            </div>
          )}
        </div>
      </div>
    </Container>
    </div>
  );
}
