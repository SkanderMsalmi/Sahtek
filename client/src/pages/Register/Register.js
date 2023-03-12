import styles from  "./Register.module.scss";
import { useMutation,gql } from '@apollo/client';
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { LOGIN_MUTATION, REGISTER_MUTATION } from "../../apis/users";
import { Alert, Button, Card, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from "reactstrap";
import Datetime from 'react-datetime';
import { Label } from "reactstrap/lib";
import withGuest from "../../components/Guard/WithGuest";
import { useDispatch } from "react-redux";
import { userLoginSuccess } from "../../store/actions";


function Register (){
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [confirmPassword,setconfirmPassword]= useState('');
  const [name,setName]= useState('');
  const [role,setRole]= useState('Patient');
  const [dayOfBirth,setDayOfBirth]= useState('');
  const userType = useParams('role');

   const navigate = useNavigate();
   const [register, { loadingP, errorP, dataP }] = useMutation(
    REGISTER_MUTATION
  );
  const [login,{data,loading,error}] = useMutation(LOGIN_MUTATION);
 
  const dispatch = useDispatch();


  
 
  const submit = async (e)=>{
    e.preventDefault();
    try {
  
      
        await register({
        variables:{
          userInput: {
            "role": role,
            "name": name,
            "password": password,
            "email": email,
            "dateOfBirth": dayOfBirth
          }
        }
      });
      const { data } = await login({ variables: { email, password } });
      const { user, token } = data.login;
      // Save the token in localStorage
      // Dispatch the action to update the store
      dispatch(userLoginSuccess(user, token));

      navigate('/profile2');
    } catch (message) {
      console.log(message);
    }
  }



  if ( loadingP) return <div>Loading...</div>;
  // if (errorT ) return <div>Error: {errorT.message}</div> 
  if (errorP) return <div>Error: {errorP.message}</div> 
    return (
      <div
      className="section section-image section-login"
      style={{
        backgroundImage: "url(" + require("../../assets/img/login-image.jpg") + ")"
      }}
    >
        <Container>
            <Row>
              <Col className="mx-auto" lg="4" md="6">
                <Card className="card-register">
                  <h3 className="title mx-auto">Welcome</h3>
                  
                  <Form className="register-form" onSubmit={submit}>
                    <label>Name</label>
                    <InputGroup className="form-group-no-border">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-touch-id" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input  placeholder="Full Name" name="name" type="text" onChange={(e)=>setName(e.target.value)} />
                    </InputGroup>
                    <label>Email</label>
                    <InputGroup className="form-group-no-border">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Email" type="email"  onChange={(e)=>setEmail(e.target.value)}/>
                    </InputGroup>
                    <label>Password</label>
                    <InputGroup className="form-group-no-border">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-key-25" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
                    </InputGroup>
                    <label>Confirm Password</label>
                    <InputGroup className="form-group-no-border">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-key-25" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Repeat Password" type="password" onChange={(e)=>setconfirmPassword(e.target.value)}/>
                    </InputGroup>
                    <label>Birthday</label>
                    <InputGroup className="form-group-no-border">
                     
                    <Datetime
                    onChange={(e)=>setDayOfBirth(e.toDate())}
                        timeFormat={false}
                        inputProps={{placeholder:"Insert Your Birthday"}}
                        className={`${styles.datePickerTime} w-100`}
                    />
                    </InputGroup>
                    <InputGroup className="m-5" >

                    <div className="form-check-radio m-1">
        <Label className="form-check-label ">
            <Input type="radio" name="role" id="patient" value="Patient" onChange={(e)=>setRole(e.target.value)} checked={role === "Patient"}/>
            Patient
            <span className="form-check-sign"></span>
        </Label>
        
      </div>
      <div className="form-check-radio m-1">
        <Label className="form-check-label">
          <Input type="radio" name="role" id="therapist" value="Therapist" onChange={(e)=>setRole(e.target.value)}  checked={role === "Therapist"}/>
          Therapist
          <span className="form-check-sign"></span>
        </Label>
      </div>
      </InputGroup>

                    <br/>
                    {/* <Alert className="alert-with-icon" color="danger" isOpen={alertDanger}>
          <Container>
            <div className="alert-wrapper">
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => setAlertDanger(false)}
              >
                <i className="nc-icon nc-simple-remove" />
              </button>
              <div className="message">
                <i className="nc-icon nc-bell-55" /> Wrong email or password.
              </div>
            </div>
          </Container>
        </Alert> */}
                    <Button
                      block
                      className="btn-round"
                      color="danger"
                      type="submit"
                      onClick={(e) => submit(e)}
                    >
                      Register
                    </Button>
                  </Form>
            <div className="forgot">
                    <Button
                      className="btn-link"
                      color="danger"
                    >
                      Already have an <Link to="/login">account</Link> ? 
                    </Button>
                  </div>
                </Card>
           
              </Col>
            </Row>
         
          </Container>
        </div>


    )
}

export default withGuest(Register);