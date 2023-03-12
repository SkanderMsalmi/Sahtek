import { useMutation,gql } from '@apollo/client';
import { createContext, useContext, useState } from "react";
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
    Col,
    Alert
  } from "reactstrap";

import { LOGIN_MUTATION } from "../../apis/users";
import { userLoginSuccess } from "../../store/users/user.actions";
import { useDispatch } from "react-redux";
import withGuest from '../../components/Guard/WithGuest';



function Login2 (){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email,setEmail]=useState('');
    const [password,setPassword]= useState('');
    const [userType,setUserType]= useState('Patient');
    const [alertDanger, setAlertDanger] = useState(false);
    
    const [login,{data,loading,error}] = useMutation(LOGIN_MUTATION);

    const handleSubmit =async (event) => {
        event.preventDefault();
        try {
          const { data } = await login({ variables: { email, password } });
      const { user, token } = data.login;
      // Save the token in localStorage
      // Dispatch the action to update the store
      dispatch(userLoginSuccess(user, token));
      // Redirect the user to the dashboard page or other authorized page
      navigate('/');
        } catch (error) {
          console.error(error);
          
        }
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
                  <h3 className="title mx-auto">Welcome Back</h3>
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
                  <Form className="register-form" onSubmit={handleSubmit}>
                    <label>Email</label>
                    <InputGroup className="form-group-no-border">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Email" type="email"  value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    </InputGroup>
                    <label>Password</label>
                    <InputGroup className="form-group-no-border">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-key-25" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Password" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    </InputGroup>
                    <br/>
                    <Alert className="alert-with-icon" color="danger" isOpen={alertDanger}>
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
        </Alert>
                    <Button
                      block
                      className="btn-round"
                      color="danger"
                      type="submit"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Login
                    </Button>
                  </Form>
                  <div className="forgot">
                    <Button
                      className="btn-link"
                      color="danger"
                      href="/forgetpassword"
                      onClick={(e) => e.preventDefault()}
                    >
                      Forgot password?
                    </Button>
                  </div>
                </Card>
            
              </Col>
            </Row>
         
          </Container>
        </div>
  
          )
        }
        
        export default withGuest(Login2);