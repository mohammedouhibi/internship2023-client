import React, { useEffect, useState } from "react";
import items from "./../../../items.json";
import "./notificationtray.css";
import { Button, Card } from "reactstrap";
import { Trash } from "react-bootstrap-icons";

export default function Notificationtray(props) {
  const deselect = props.onItemDeSelect;


  return (
    <div className="app-nav-notification-tray" >
      {props.shoppingList.length === 0 ? (
        
        <div className="shopping-list-empty">
          Nothing here yet!
        </div>
      ) : (
        <>
          <div className="notification-items">
            {props.shoppingList.map((item,index) => (
              <Card key={index}>
                <div className="notification-item">
                  <img
                    className="notification-item-image"
                    src={require("./../../assets/" + item.imgName)}
                  />
                  <div className="notification-item-name">{item.name}</div>
                  <Trash className="notification-delete-icon" onClick={()=> deselect(item)}></Trash>
                </div>
              </Card> 
            ))}
          </div>
          <div className="notification-utility-container">
            <Button className="notification-purchase-button">
              Complete order
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
