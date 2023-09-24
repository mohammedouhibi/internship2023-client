import React, { useEffect, useState } from "react";
import "./purchase-history.css";
import { Container, Table } from "reactstrap";
import fetchWithAuth from "../../fetch-interceptor";

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
          {purchaseHistory.map((order, index) => (
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
                <Table cellPadding={"4px"}  hover >
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product ID</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Total Price</th>
                      <th>Rating</th>
                    </tr>
                  </thead>

                  <tbody>
                    {order.cartItems.map((item) => (
                      <tr key={item.productId}>
                        <td>
                          <img
                            src={require(`../assets/${item.product.image}`)}
                            className="purchase-history-cart-item-image"
                          />
                        </td>
                        <td>{item.productId}</td>
                        <td>{item.quantity}</td>
                        <td>{item.product.price}$</td>
                        <td>{(item.product.price*item.quantity).toFixed(2)}</td>
                        <td>
                        
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
