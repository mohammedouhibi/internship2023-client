import React, { useEffect, useState } from "react";
import "./purchase-history.css";
import { Container, Table } from "reactstrap";
import fetchWithAuth from "../../fetch-interceptor";
import { Rating } from "@mui/material";
import toast from "react-hot-toast";

export default function PurchaseHistory(props) {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [active, setActive] = useState(-1);

  const getPurchaseHistory = async () => {
    try {
      const response = await fetchWithAuth(
        "https://localhost:7289/Orders/get-purchase-history",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setPurchaseHistory(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccordionClick = (index) => {
    if (active === index) {
      setActive(-1);
    } else {
      setActive(index);
    }
  };
  const Rate = async (cartItemId,value) => {
    const params = new URLSearchParams();
    params.append("cartItemId", cartItemId);
    params.append("rating", value);
    const res = await fetchWithAuth(
      "https://localhost:7289/Orders/rate-cart-item?" + params.toString(),
      {
        method: "POST",
      }
    )



    if(res.ok){
      getPurchaseHistory();
    }
    let err="";
    const resPromise = new Promise(async (resolve, reject) => {
      if(res.ok){
      resolve(res);}
      else{
        //get error text
        err = await res.text();
        reject(err);
      }
    });
    toast.promise(resPromise, {
      loading: "Processing...",
      success: "Thank you for rating our product!",
      error: (error)=>((value !== null && cartItemId !== null) ? (<b>{error}</b>):(<b>Something went wrong.</b>) )
    })

  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day.toString().padStart(2, "0")}-${month
      .toString()
      .padStart(2, "0")}-${year} ${hours}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  useEffect(() => {
    getPurchaseHistory();
  }, []);
  return (
    <div className="purchase-history-page">
      <Container className="purchase-history-container">
        <div className="purchase-history-box">
          {purchaseHistory.map((order, index) => order.cartItems.length > 0 && (
            <div className="purchase-history-accordion shadow">
              <div
                className={`purchase-history-accordion-header  ${
                  active === index ? "active" : ""
                }`}
              >
                <div className="purchase-history-accordion-header-box">
                  <div className="purchase-history-accordion-header-title-item">
                    <b>Order #{order.orderId}</b>
                  </div>
                  <div className="purchase-history-accordion-header-title-item">
                    Total value: {order.totalPrice}$
                  </div>
                  <div className="purchase-history-accordion-header-title-item">
                    Order date: {formatDate(order.orderDate)}
                  </div>
                  <div className="purchase-history-accordion-header-title-view">
                    <div
                      className="purchase-history-accordion-header-title-view-button"
                      onClick={() => handleAccordionClick(index)}
                    >
                      {" "}
                      View items ({order.cartItems.length})
                    </div>{" "}
                  </div>
                </div>
              </div>
              <div
                className={`purchase-history-accordion-content  ${
                  active === index ? "active" : ""
                }`}
              >
                <Table cellPadding={"4px"}  hover  className="purchase-history-cart-table" >
                  <thead >
                    <tr>
                      <th>Product</th>
                      <th>Product ID</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Total Price</th>
                      <th>Rating</th>
                    </tr>
                  </thead>

                  <tbody className="purchase-history-cart-table-content">
                    {order.cartItems.map((item) => (
                      <tr key={item.productId} >
                        <td>
                          <img
                            src={require(`../assets/${item.product.image}`)}
                            className="purchase-history-cart-item-image"
                          />
                          {item.product.name}
                        </td>
                        <td>{item.productId}</td>
                        <td>{item.quantity}</td>
                        <td>{item.product.price}$</td>
                        <td>{(item.product.price*item.quantity).toFixed(2)}</td>
                        <td>
                        <Rating name="read-only" value={item.rating} onChange={(event, value)=>{
                          Rate(item.cartItemId,value)
                        }} />
                          </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
