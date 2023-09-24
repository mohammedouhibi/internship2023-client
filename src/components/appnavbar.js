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
import ProfileTray from "./items/profile-tray/profile-tray";
import { Toaster } from "react-hot-toast";

export default function Appnavbar(props) {
  const [isProfileTray, setIsProfileTray] = useState(false);
  const [modal, setModal] = useState(false);
  const toggleLogin = () => setModal(!modal);

  const toggleNotificationTray = () =>
    props.setIsNotificationTray(!props.isNotificationTray);


  const logout = () => props.useLocalStorage.setToken("");

  return (
    <Container>
      <nav color="transparent" className="app-nav">
        <img
          className="app-nav-logo"
          src={require("./assets/logo-coffe.png")}
          onClick={() => (window.location.href = "/")}
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
            onOutsideClick={() => props.setIsNotificationTray(false)}
          >
            <div className="app-nav-cart-icon-container">
              {props.isNotificationTray && (
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
          ) : props.currentUser.image !== "" ? (
            <OutsideClickHandler onOutsideClick={() => setIsProfileTray(false)}>
            <div className="pfp-container">
              <img
                className="profile-image"
                src={props.currentUser.image}
                alt="profileImage"
                onClick={()=>setIsProfileTray(!isProfileTray)}
              />

              {isProfileTray && (<ProfileTray
              username={()=>(props.currentUser.name+" " + props.currentUser.lastName)}
              logout={logout}
              ></ProfileTray>)}
            </div>
            </OutsideClickHandler>
          ) : (
            <div className="pfp-container">
              <img
                className="profile-image"
                src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
              />
            </div>
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
