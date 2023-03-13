import styles from "./Register.module.scss";
import { useMutation, gql } from "@apollo/client";
import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGIN_MUTATION, REGISTER_MUTATION } from "../../apis/users";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import Datetime from "react-datetime";
import { Label } from "reactstrap/lib";
import withGuest from "../../components/Guard/WithGuest";
import { useDispatch } from "react-redux";
import { userLoginSuccess } from "../../store/actions";

function Register() {
  // const [email,setEmail]= useState('');
  // const [password,setPassword]= useState('');
  // const [confirmPassword,setconfirmPassword]= useState('');
  // const [name,setName]= useState('');
  // const [role,setRole]= useState('Patient');
  const [dayOfBirth, setDayOfBirth] = useState(new Date());
  // const userType = useParams('role');

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("You should insert your name")
      .min(2, "insert a real name"),
    email: yup
      .string()
      .required("You should insert your email")
      .email("Please insert a valid email"),
    password: yup
      .string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    role: yup.string().required("Are you a patient or therapist ?"),
    confirmPassword: yup
      .string()
      .required("Confirm your password ")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
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

  const navigate = useNavigate();
  const [registerUser, { loadingP, errorP, dataP }] =
    useMutation(REGISTER_MUTATION);
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const dispatch = useDispatch();

  const submit = handleSubmit(
    async ({ name, role, password, email, confirmPassword }) => {
      try {
        clearErrors();
        if (new Date().getFullYear() - dayOfBirth.getFullYear() < 18) {
          setError("age", {
            type: "value",
            message: "You should be bigger than 18",
          });
        }
        await registerUser({
          variables: {
            userInput: {
              role: role,
              name: name,
              password: password,
              email: email,
              dateOfBirth: dayOfBirth,
            },
          },
        });
        const { data } = await login({ variables: { email, password } });
        const { user, token } = data.login;
        // Save the token in localStorage
        // Dispatch the action to update the store
        dispatch(userLoginSuccess(user, token));

        navigate("/alertCheckMail");
      } catch (error) {
        setError("generic", { type: "generic", error });
        console.log(errors);
      }
      // }
    }
  );

  // const submit = async (e)=>{
  //   // e.preventDefault();
  //

  // if ( loadingP) return <div>Loading...</div>;
  // if (errorT ) return <div>Error: {errorT.message}</div>
  // if (errorP) return <div>Error: {errorP.message}</div>
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
              <h3 className="title mx-auto">Welcome</h3>

              {errors?.generic && (
                <Alert color="danger" isOpen={errors?.generic}>
                  {errors.generic.error.message}
                </Alert>
              )}
              <form tag={Form} className="register-form" onSubmit={submit}>
                <label>Name</label>
                <InputGroup
                  className={
                    errors.name ? "has-danger" : "form-group-no-border"
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="nc-icon nc-touch-id" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <input
                    className="form-control"
                    placeholder="Full Name"
                    name="name"
                    type="text"
                    {...register("name")}
                  />
                </InputGroup>
                {errors?.name && (
                  <Alert color="danger" isOpen={errors?.name}>
                    {errors.name.message}
                  </Alert>
                )}

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
                    type="email"
                    placeholder="Email"
                    name="email"
                    {...register("email")}
                  />
                </InputGroup>
                {errors?.email && (
                  <Alert color="danger" isOpen={errors?.email}>
                    {errors.email.message}
                  </Alert>
                )}
                {error && (
                  <Alert color="danger" isOpen={error}>
                    {error}
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
                    name="password"
                    type="password"
                    {...register("password")}
                  />
                </InputGroup>
                {errors?.password && (
                  <Alert color="danger" isOpen={errors?.password}>
                    {errors.password.message}
                  </Alert>
                )}
                <label>Confirm Password</label>
                <InputGroup
                  className={
                    errors.confirmPassword
                      ? "has-danger"
                      : "form-group-no-border"
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="nc-icon nc-key-25" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <input
                    className="form-control"
                    placeholder="Repeat Password"
                    name="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                  />
                </InputGroup>
                {errors?.confirmPassword && (
                  <Alert color="danger" isOpen={errors?.confirmPassword}>
                    {errors.confirmPassword.message}
                  </Alert>
                )}
                <label>Birthday</label>
                <InputGroup className="form-group-no-border">
                  <Datetime
                    onChange={(e) => setDayOfBirth(e.toDate())}
                    timeFormat={false}
                    inputProps={{ placeholder: "Insert Your Birthday" }}
                    className={`${styles.datePickerTime} w-100`}
                  />
                </InputGroup>
                {errors?.age && (
                  <Alert color="danger" isOpen={errors?.age}>
                    You should be more than 18
                  </Alert>
                )}
                <InputGroup className="m-5">
                  <div className="form-check-radio m-1">
                    <Label className="form-check-label ">
                      <input
                        className="form-control"
                        type="radio"
                        name="role"
                        id="patient"
                        value="Patient"
                        {...register("role")}
                      />
                      Patient
                      <span className="form-check-sign"></span>
                    </Label>
                  </div>
                  <div className="form-check-radio m-1">
                    <Label className="form-check-label">
                      <input
                        className="form-control"
                        type="radio"
                        name="role"
                        id="therapist"
                        value="Therapist"
                        {...register("role")}
                      />
                      Therapist
                      <span className="form-check-sign"></span>
                    </Label>
                  </div>
                </InputGroup>
                {errors?.role && (
                  <Alert color="danger" isOpen={errors?.role}>
                    {errors.role.message}
                  </Alert>
                )}

                <br />
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
                  disabled={isSubmitting}
                >
                  Register
                </Button>
              </form>
              <div className="forgot">
                <Button className="btn-link" color="danger">
                  Already have an <Link to="/login">account</Link> ?
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default withGuest(Register);
