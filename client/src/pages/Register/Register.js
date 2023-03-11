import styles from  "./Register.module.scss";
import { useMutation,gql } from '@apollo/client';
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { REGISTER_MUTATION } from "../../apis/users";
import { Alert, Button, Card, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from "reactstrap";
import Datetime from 'react-datetime';
import { Label } from "reactstrap/lib";


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
 


  
 
  const submit = async (e)=>{
    e.preventDefault();
    console.log(email,name,password,confirmPassword,dayOfBirth,role,dayOfBirth);
    try {
  
      
       const user = await register({
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
    
      console.log(user);

      navigate('/login');
    } catch (message) {
      console.log("error");
    }
  }


  // const [firstname,setFirstName]=useState('');
  // const [lastname,setLastName]=useState('');
  // const [password,setPassword]= useState('');
  // const [confirmPassword,setConfirmPassword]= useState('');
  // const [dateOfBirth,setdateOfBirth]= useState('');
  // const [userType,setUserType]= useState('Patient');
  // const [registerPatient,{data,loading,error}] = useMutation(Register_MUTATION);

  // const handleSubmits = (event) => {
  //     event.preventDefault();
      
  //   const name = firstname + " " +lastname;
  //   if(password.match(confirmPassword)){
  //     registerPatient({ variables: {name,email, password, dateOfBirth } });
  //   navigate("/login");
  //   }else{
  //     throw error
  //   }
  //   };
  // if (loadingT || loadingP) return <div>Loading...</div>;
  // if (errorT ) return <div>Error: {errorT.message}</div> 
  // if (errorP) return <div>Error: {errorT.message}</div> 
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

export default Register;