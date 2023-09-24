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
import "./registration-form.css";

import * as filestack from "filestack-js";
import toast from "react-hot-toast";

const RegistrationForm = (props) => {
  const [formData, setFormData] = useState({
    Name: "",
    LastName: "",
    Gender: null,
    Email: "",
    Image: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [err, setErr] = useState({
    Name: "",
    LastName: "",
    Gender: "",
    Email: "",
    Image: "",
    Password: "",
    ConfirmPassword: "",
  });

  const validateForm = () => {
    var error = {
      Name: "",
      LastName: "",
      Gender: "",
      Email: "",
      Image: "",
      Password: "",
      ConfirmPassword: "",
    };
    formData.Name.length < 3
      ? (error.Name = "Name must be at least 3 characters long")
      : (error.Name = "");
    formData.LastName.length < 3
      ? (error.LastName = "Last name must be at least 3 characters long")
      : (error.LastName = "");
    formData.Gender == null
      ? (error.Gender = "Chose an option")
      : (error.Gender = "");
    formData.Password.length < 8
      ? (error.Password = "Password must be at least 8 characters long")
      : (error.Password = "");
    formData.Password !== formData.ConfirmPassword
      ? (error.ConfirmPassword = "Password does not match")
      : (error.ConfirmPassword = "");

    setErr(error);

    return (
      error.Name === "" &&
      error.LastName === "" &&
      error.Gender === "" &&
      error.Email === "" &&
      error.Password === "" &&
      error.ConfirmPassword === ""
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenderChange = (e) => {
    setFormData({
      ...formData,
      Gender: Number(e.target.value),
    });
  };

  const handleImageChange = async (e) => {
    const imgClient = filestack.init("AKaVqo84XSErjnaTgFlkuz");

    imgClient.upload(e.target.files[0]).then((data) =>
      setFormData({
        ...formData,
        Image: data.url,
      })
    );
  };


  const registrationPromise = () => {
    return new Promise(async (resolve, reject) => {
      try {
        if(validateForm()) {
          const res = await fetch("https://localhost:7289/Users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData)
          });
          
          if(res.ok) {
            props.toggle();
            resolve();
          } else {
            const errorMsg = await res.text();
        reject({message: errorMsg}); 
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.promise(
      registrationPromise(),
      {
        loading: 'Registering...',
        success: <b>Registered!</b>,
        error: (error)=>(<b>{error.message}</b> )
      }
    );
  

  
  };

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader>Register</ModalHeader>
      
      <form onSubmit={handleSubmit}>
        <ModalBody className="registration-form">
          <div className="registration-form-inputs">
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
              />
              {err.Name !== "" && (<Alert color="danger">{err.Name}</Alert>)}
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                type="text"
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
                required
              />
              {err.LastName !== "" && (<Alert color="danger">{err.LastName}</Alert>)}
            </div>
            <div>
              <Label>Gender</Label>
              <Input
                name="Gender"
                type="select"
                value={formData.Gender}
                onChange={handleGenderChange}
                required
              >
                <option value={null}></option>
                <option value={0}>Male</option>
                <option value={1}>Female</option>
              </Input>
              
              {err.Gender !== "" && (<Alert color="danger">{err.Gender}</Alert>)}
            </div>
            <div>
              <Label>E-mail</Label>
              <Input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
              
              {err.Email !== "" && (<Alert color="danger">{err.Email}</Alert>)}
            </div>
            <div>
              <Label>Profile picture</Label>
              <Input type="file" name="Image" onChange={handleImageChange} />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                required
              />
              
              {err.Password !== "" && (<Alert color="danger">{err.Password}</Alert>)}
            </div>
            <div>
              <Label>Confirm password</Label>
              <Input
                type="password"
                name="ConfirmPassword"
                value={formData.ConfirmPassword}
                onChange={handleChange}
              />
              
              {err.ConfirmPassword !== "" && (<Alert color="danger">{err.ConfirmPassword}</Alert>)}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.toggle}>Cancel</Button>
          <Button type="submit" color="primary">
            Register
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default RegistrationForm;
