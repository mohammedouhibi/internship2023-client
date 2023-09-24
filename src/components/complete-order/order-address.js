import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import  entries  from './states.json'
import './order-address.css'
export default function OrderAddress(props) {


  return (
    
    <Form  className='address-form'>
      <FormGroup>
        <Label>Zip/Postal Code</Label>  
        <Input type="text" name='zip' value={props.formData.zip} onChange={props.handleChange}/>
        {props.error.zip !=="" && <Alert color="danger">{props.error.zip}</Alert>}
      </FormGroup>

      <FormGroup>
        <Label>State</Label>
        <Input type="select" name='state' value={props.formData.state} onChange={props.handleChange}>
            <option value=""></option>
          {entries.map(state => (
            <option key={state} value={state} >{state}</option>
          ))}
        </Input>
        {props.error.state !=="" && <Alert color="danger">{props.error.state}</Alert>}
      </FormGroup>

      <FormGroup>
        <Label>Address</Label>
        <Input type="text" name='address' value={props.formData.address} onChange={props.handleChange}/>
        {props.error.address !=="" && <Alert color="danger">{props.error.address}</Alert>}
      </FormGroup>

      <FormGroup>
        <Label>Phone Number</Label>
        <Input type="text" name='phone' minLength={8} maxLength={8}  value={props.formData.phone} onChange={props.handleChange} />
        {props.error.phone !=="" && <Alert color="danger">{props.error.phone}</Alert>}
      </FormGroup>

      <FormGroup>
        <Label>Additional Info</Label>
        <Input type="textarea" name='info' value={props.formData.info} onChange={props.handleChange}/>
      </FormGroup>

    </Form>
  );
}
