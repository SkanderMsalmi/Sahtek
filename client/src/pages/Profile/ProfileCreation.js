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
import { yupResolver } from "@hookform/resolvers/yup";
import withAuth from "../../components/Guard/WithAuth";
import isVerified from "../../components/Guard/IsVerified";

function ProfileCreation() {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const schema = yup.object().shape({
    phoneNumber: yup
      .string()
      .required("You should enter your phone number")
      .matches(phoneRegExp, "Please enter a valid phone number"),
    password: yup
      .string()
      .required("You should enter your password")
      .min(6, "write your real password"),
  });
  const initialValues = {
    phoneNumber: "",
    street: "",
    state: "",
    zip: "",
    city: ""
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
      // Save the token in localStorage
      // Dispatch the action to update the store
      // Redirect the user to the dashboard page or other authorized page
      navigate("/profile2");
    } catch (error) {
      setError("generic", { type: "generic", error });
    }
  });
//   const handlePhone = (e) => {
//     const re = /^[0-9\b]+$/;
//     if (e.target.value === '' || re.test(e.target.value)) {
//         setEditInfo({...editInfo, phoneNumber: e.target.value})
//     }
// }
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
              <h3 className="mx-auto text-center">Let's finalize your account</h3>
              <h4 className="text-center mb-2 text-underline">Contact Info</h4>
              <Form className="register-form" onSubmit={submit}>
                <label>Phone number</label>
                <InputGroup
                  className={
                    errors.phoneNumber ? "has-danger" : "form-group-no-border"
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="nc-icon nc-email-85" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <input
                    className="form-control"
                    placeholder="Phone number"
                    type="text"
                    name="phoneNumber"
                    // onChange={(e)=>handlePhone(e)}
                    {...register("phoneNumber")}
                  />
                </InputGroup>
                {errors?.phoneNumber && (
                  <Alert color="danger" isOpen={errors?.phoneNumber}>
                    {errors.phoneNumber.message}
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

export default withAuth(isVerified(ProfileCreation));
