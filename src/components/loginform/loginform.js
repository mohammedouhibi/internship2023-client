import React, { useState } from "react";
import {
  Alert,
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import "./loginform.css";
import RegistrationForm from "../registrationform/registration-form";
const LoginForm = (props) => {
  const [modal, setModal] = useState(false);
  const toggleRegistration = () => setModal(!modal);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
      const response = await fetch("https://localhost:7289/Users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.text();
      if (response.ok) {
        props.useLocalStorage.setToken(data);
        localStorage.setItem("token", data);
        props.toggle()
    }
  };

 

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <div>
        <ModalHeader>Login</ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody className="login-form">
            <div className="login-inputs">
              <div>
                <Label>E-mail</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              Don't have an account?{" "}
              <a href="#" onClick={toggleRegistration}>
                Register for free!
              </a>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={props.toggle}>Cancel</Button>
            <Button type="submit" color="primary">
              Login
            </Button>
          </ModalFooter>
        </form>
      </div>
      <RegistrationForm isOpen={modal} toggle={toggleRegistration} />
    </Modal>
  );
};

export default LoginForm;
