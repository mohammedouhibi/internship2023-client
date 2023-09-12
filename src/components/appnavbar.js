import React, { useEffect, useState } from "react";
import {
  Navbar,
  Row,
  Col,
  Container,
  NavbarBrand,
  NavLink,
  Modal,
  Button,
} from "reactstrap";
import Search from "./items/search";
import "./appnavbar.css";
import Notificationtray from "./items/notificationtray/notificationtray";
import OutsideClickHandler from "react-outside-click-handler";
import LoginForm from "./loginform/loginform";

export default function Appnavbar(props) {
  const [modal, setModal] = useState(false);
  const toggleLogin = () => setModal(!modal);

  const [isNotificationTray, setIsNotificationTray] = useState(false);

  const toggleNotificationTray = () =>
    setIsNotificationTray(!isNotificationTray);
  return (
    <Container>
      <nav color="transparent" className="app-nav">
        <img
          className="app-nav-logo"
          src={require("./assets/logo-coffe.png")}
        />

        <div className="app-nav-links">
          <a className="app-nav-link-orange  " href="#">
            About us
          </a>
          <a className="app-nav-link  " href="#">
            Our Product
          </a>
          <a className="app-nav-link " href="#">
            Delivery
          </a>
        </div>

        <div className="app-nav-utils">
          <Search></Search>
          <OutsideClickHandler
            onOutsideClick={() => setIsNotificationTray(false)}
          >
            <div className="app-nav-cart-icon-container">
              {isNotificationTray && (
                <Notificationtray
                  shoppingList={props.shoppingList}
                  onItemDeSelect={props.onItemDeSelect}
                />
              )}
              <img
                className="app-nav-cart-icon"
                src={require("./assets/Group.png")}
                onClick={toggleNotificationTray}
              />

              {props.shoppingList.length !== 0 && (
                <div className="app-nav-cart-notification"></div>
              )}
            </div>
          </OutsideClickHandler>

          {props.useLocalStorage.token === "" ? (
            <Button
              onClick={toggleLogin}
              className="rounded-pill login-button login"
            >
              login
            </Button>
          ) : (
            props.currentUser.image !== "" ? (
              <img
                className="profile-image"
                src={props.currentUser.image}
                onClick={() => props.useLocalStorage.setToken("")}
              />
            ): (<img className=""
            src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" /> )
          )}
        </div>
      </nav>

      <LoginForm
        isOpen={modal}
        toggle={toggleLogin}
        useLocalStorage={props.useLocalStorage}
      ></LoginForm>
    </Container>
  );
}
