import { useMutation, gql } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  Button,
  Card,
  Form,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { LOGIN_MUTATION } from "../../apis/users";
import { userLoginSuccess } from "../../store/users/user.actions";
import { useDispatch } from "react-redux";
import withGuest from "../../components/Guard/WithGuest";
import { yupResolver } from "@hookform/resolvers/yup";

function Login2() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("You should enter your mail")
      .email("Please enter a valid email"),
    password: yup
      .string()
      .required("You should enter your password")
      .min(6, "write your real password"),
  });
  const initialValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(schema),
  });

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const submit = handleSubmit(async ({ password, email }) => {
    try {
      clearErrors();
      const { data } = await login({ variables: { email, password } });
      const { user, token } = data.login;
      // Save the token in localStorage
      // Dispatch the action to update the store
      dispatch(userLoginSuccess(user, token));
      // Redirect the user to the dashboard page or other authorized page
      navigate("/profile2");
    } catch (error) {
      setError("generic", { type: "generic", error });
    }
  });

  return (
    <div
      className="section section-image section-login"
      style={{
        backgroundImage:
          "url(" + require("../../assets/img/login-image.jpg") + ")",
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
              <Form className="register-form" onSubmit={submit}>
                <label>Email</label>
                <InputGroup
                  className={
                    errors.email ? "has-danger" : "form-group-no-border"
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="nc-icon nc-email-85" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <input
                    className="form-control"
                    placeholder="Email"
                    type="email"
                    name="email"
                    {...register("email")}
                  />
                </InputGroup>
                {errors?.email && (
                  <Alert color="danger" isOpen={errors?.email}>
                    {errors.email.message}
                  </Alert>
                )}
                <label>Password</label>
                <InputGroup
                  className={
                    errors.password ? "has-danger" : "form-group-no-border"
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="nc-icon nc-key-25" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <input
                    className="form-control"
                    placeholder="Password"
                    type={passwordType}
                    name="password"
                    {...register("password")}
                  />
                </InputGroup>

                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      onChange={(e) => {
                        togglePassword();
                      }}
                    />{" "}
                    Show Password
                    <span className="form-check-sign">
                      <span className="check"></span>
                    </span>
                  </Label>
                </FormGroup>
                {errors?.password && (
                  <Alert color="danger" isOpen={errors?.password}>
                    {errors.password.message}
                  </Alert>
                )}
                <br />
                {errors?.generic && (
                  <Alert color="danger" isOpen={errors?.generic}>
                    {errors.generic.error.message}
                  </Alert>
                )}
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
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/forgetpassword");
                  }}
                >
                  Forget Password?{" "}
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default withGuest(Login2);
