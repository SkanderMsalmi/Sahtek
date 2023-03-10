import styles from  "./Login.module.scss";
import { useMutation,gql } from '@apollo/client';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col
  } from "reactstrap";
const LOGIN_MUTATION = gql`
mutation Login($email: String!, $password: String!, $userType: String!) {
    login(email: $email, password: $password, userType: $userType)
  }
`;


function Login2 (){
    const navigate = useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]= useState('');
    const [userType,setUserType]= useState('Patient');
    const [login,{data,loading,error}] = useMutation(LOGIN_MUTATION);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email,password,userType);
        login({ variables: { email, password,userType } });
        navigate("/");
      };

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
                  <div className="social-line text-center">
                    <Button
                      className="btn-neutral btn-just-icon mt-0"
                      color="facebook"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fa fa-facebook-square" />
                    </Button>
                    <Button
                      className="btn-neutral btn-just-icon mt-0 ml-1"
                      color="google"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fa fa-google-plus" />
                    </Button>
                    <Button
                      className="btn-neutral btn-just-icon mt-0 ml-1"
                      color="twitter"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fa fa-twitter" />
                    </Button>
                  </div>
                  <Form className="register-form">
                    <label>Email</label>
                    <InputGroup className="form-group-no-border">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Email" type="email" />
                    </InputGroup>
                    <label>Password</label>
                    <InputGroup className="form-group-no-border">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-key-25" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Password" type="password" />
                    </InputGroup>
                    <Button
                      block
                      className="btn-round"
                      color="danger"
                      type="button"
                    >
                      Register
                    </Button>
                  </Form>
                  <div className="forgot">
                    <Button
                      className="btn-link"
                      color="danger"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Forgot password?
                    </Button>
                  </div>
                </Card>
                <div className="col text-center">
                  <Button
                    className="btn-round"
                    outline
                    color="neutral"
                    href="/register-page"
                    size="lg"
                    target="_blank"
                  >
                    View Register Page
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
  
          )
        }
        
        export default Login2;