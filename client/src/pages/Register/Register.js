import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { Label } from "reactstrap/lib";
import withGuest from "../../components/Guard/WithGuest";
import { useDispatch } from "react-redux";
import { userLoginSuccess } from "../../store/users/user.actions";

function Register() {
  //Date From Select :
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setYear(selectedYear);
  };

  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setMonth(selectedMonth);
  };

  const handleDayChange = (event) => {
    const selectedDay = event.target.value;
    setDay(selectedDay);
  };

  const months = [
    { name: "January", value: "01" },
    { name: "February", value: "02" },
    { name: "March", value: "03" },
    { name: "April", value: "04" },
    { name: "May", value: "05" },
    { name: "June", value: "06" },
    { name: "July", value: "07" },
    { name: "August", value: "08" },
    { name: "September", value: "09" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" },
  ];

  const monthOptions = months.map((month) => (
    <option key={month.value} value={month.value}>
      {month.name}
    </option>
  ));

  const daysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const dayOptions = (() => {
    if (month && year) {
      const numDays = daysInMonth(year, month);
      return Array.from({ length: numDays }, (_, i) => i + 1).map((day) => (
        <option key={day} value={day}>
          {day}
        </option>
      ));
    } else {
      return null;
    }
  })();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const yearOptions = years.map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ));

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
    gender: yup.string().required("Pleanse Enter Your Gender"),
  });
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    gender: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(schema),
  });
  const [registerUser, { loadingP, errorP, dataP }] =
    useMutation(REGISTER_MUTATION);

  const submit = handleSubmit(
    async ({ name, role, password, email, gender }) => {
      try {
        let isoDate;
        clearErrors();
        if (!day || !month || !year) {
          setError("age", {
            type: "value",
            message: "Please Insert your birthday",
          });
        }
        if (day && month && year) {
          const dateOfBirth = new Date(year, month - 1, day); // month is 0-based in Date constructor
          const ageDiffMs = Date.now() - dateOfBirth.getTime();
          const ageDate = new Date(ageDiffMs); // convert the age difference to a Date object
          const age = Math.abs(ageDate.getUTCFullYear() - 1970); // get the absolute difference in years
          if (age < 18) {
            setError("age", {
              type: "value",
              message: "You should be 18 years old or older",
            });
          } else {
            isoDate = dateOfBirth.toISOString();
          }
        }
        console.log(isoDate);
        await registerUser({
          variables: {
            userInput: {
              role: role,
              name: name,
              password: password,
              email: email,
              dateOfBirth: isoDate,
              gender: gender,
            },
          },
        });

        navigate("/alertCheckMail");
      } catch (error) {
        console.log(error);
        setError("generic", {
          type: "generic",
          error,
          message: "Check Your Credentials",
        });
        console.log(errors);
      }
      // }
    }
  );

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
          <Col className="mx-auto" lg="9" md="9">
            <Card className="card-register" style={{ maxWidth: "600px" }}>
              <h3 className="title mx-auto">Welcome</h3>

              {errors?.generic && (
                <Alert color="danger" isOpen={errors?.generic}>
                  {errors.generic.message}
                </Alert>
              )}
              <form tag={Form} className="register-form" onSubmit={submit}>
                <Row>
                  <Col>
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
                    <label>
                      Birthday{" "}
                      <span className="text-secondary"> (Start By Year )</span>
                    </label>
                    <div>
                      <FormGroup className="d-flex align-items-center">
                        <Input
                          type="select"
                          name="day"
                          id="day"
                          value={day}
                          onChange={handleDayChange}
                          className="me-2"
                        >
                          <option value="">Day</option>
                          {dayOptions}
                        </Input>
                        <Input
                          type="select"
                          name="month"
                          id="month"
                          value={month}
                          onChange={handleMonthChange}
                          className="me-2"
                        >
                          <option value="">Month</option>
                          {monthOptions}
                        </Input>
                        <Input
                          type="select"
                          name="year"
                          id="year"
                          value={year}
                          onChange={handleYearChange}
                          className={
                            errors?.age
                              ? "text-danger me-2"
                              : "form-group-no-border me-2"
                          }
                        >
                          <option value="">Year</option>
                          {yearOptions}
                        </Input>
                      </FormGroup>
                    </div>
                    {errors?.age && (
                      <Alert color="danger" isOpen={errors?.age}>
                        {errors?.age?.message}
                      </Alert>
                    )}
                  </Col>
                  <Col>
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
                        type={passwordType}
                        {...register("password")}
                      />
                    </InputGroup>
                    {errors?.password && (
                      <Alert color="danger" isOpen={errors?.password}>
                        {errors.password.message}
                      </Alert>
                    )}

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
                        type={passwordType}
                        {...register("confirmPassword")}
                      />
                    </InputGroup>
                    {errors?.confirmPassword && (
                      <Alert color="danger" isOpen={errors?.confirmPassword}>
                        {errors.confirmPassword.message}
                      </Alert>
                    )}
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="checkbox"
                          onChange={(e) => {
                            togglePassword();
                          }}
                        />{" "}
                        Show password
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>

                    <label>Gender</label>

                    <InputGroup className="m-auto justify-content-center">
                      <div className="form-check-radio m-1 ">
                        <Label className="form-check-label ">
                          <input
                            className="form-control"
                            type="radio"
                            name="gender"
                            id="male"
                            value="Male"
                            {...register("gender")}
                          />
                          Male
                          <span className="form-check-sign"></span>
                        </Label>
                      </div>
                      <div className="form-check-radio m-1">
                        <Label className="form-check-label">
                          <input
                            className="form-control"
                            type="radio"
                            name="gender"
                            id="female"
                            value="Female"
                            {...register("gender")}
                          />
                          Female
                          <span className="form-check-sign"></span>
                        </Label>
                      </div>
                      <div className="form-check-radio m-1">
                        <Label className="form-check-label">
                          <input
                            className="form-control"
                            type="radio"
                            name="gender"
                            id="other"
                            value="Other"
                            {...register("gender")}
                          />
                          Other
                          <span className="form-check-sign"></span>
                        </Label>
                      </div>
                    </InputGroup>
                    {errors?.gender && (
                      <Alert color="danger" isOpen={errors?.gender}>
                        {errors.gender.message}
                      </Alert>
                    )}
                    <br />
                  </Col>
                </Row>
                <div className="text-center">
                  <label style={{}}>Are you Patient or Therapist ?</label>
                </div>

                <InputGroup className="m-auto justify-content-center">
                  <div className="form-check-radio m-1 ">
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
