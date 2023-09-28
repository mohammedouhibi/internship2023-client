import React, { useEffect, useState } from "react";
import items from "./../../../items.json";
import "./notificationtray.css";
import { Button, Card, Table } from "reactstrap";
import { Trash } from "react-bootstrap-icons";

export default function Notificationtray(props) {
  

  return (
    <div className="app-nav-notification-tray shadow" >
      {props.shoppingList.length === 0 ? (
        
        <div className="shopping-list-empty">
          Nothing here yet!
        </div>
      ) : (
        <>
          <div className="notification-items">
            <Table>
            {props.shoppingList.map((item,index) => (
             <tbody>
              <tr key={index}>
                <div className="notification-item">
                  <img
                    className="notification-item-image"
                    src={require("./../../assets/" + item.product.image)}
                  />
                  <div className="notification-item-name">{item.product.name+" x"+item.quantity}</div>
                  <Trash className="notification-delete-icon" onClick={()=> props.onItemDeSelect(item)}></Trash>
                </div>
              </tr> 
              </tbody> 
            ))}
            </Table>
          </div>
          <div className="notification-utility-container">
            <Button className="notification-purchase-button" onClick={()=>
              window.location.href = "/order"

            }>
              Complete order
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
