import { useMutation, gql } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from './ProfileCreation.module.scss'

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
import { yupResolver } from "@hookform/resolvers/yup";
import withAuth from "../../components/Guard/WithAuth";
import isVerified from "../../components/Guard/IsVerified";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/users/users.selectors";
const UPDATE_THERAPIST = gql`mutation Mutation($therapistInput: TherapistInput) {
  updateTherapist(therapistInput: $therapistInput) {
    therapist{experience}
  }
}`
function ProfileCreation() {
  const navigate = useNavigate();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
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
  const user = useSelector(selectUser);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const yearOptions = years.map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ));
  const schema = yup.object().shape({
    phoneNumber: yup
      .string()
      .required("You should enter your phone number")
      .matches(phoneRegExp, "Please enter a valid phone number"),
    street: yup.string().required("You should enter your street address"),
    state: yup.string().required("You should enter your state"),
    zip: yup.string().required("You should enter your zip code"),
    city: yup.string().required("You should enter your city"),
    description: yup.string().required("You should enter your description"),
    licenses: yup.array().of(yup.object().shape({ license: yup.string().required("You should enter your license"), state: yup.string().required("You should enter the state"), typeL: yup.string().required("You should enter the type of license") })).required("You should enter atleast one license"),
    languages: yup.array().of(yup.string().required("Enter a valid language")).min(1, "You should enter atleast one language"),
    specialties: yup.array().of(yup.string().required("You should enter your specialty")).required("You should enter atleast one specialty"),
    educations: yup.array().of(yup.string().required("You should enter your education")).required("You should enter atleast one education"),
  });
  const [languages, setLanguages] = useState([""]);
  const [licenses, setLicenses] = useState([""]);
  const [specialties, setSpecialties] = useState([""]);
  const [educations, setEducations] = useState([""]);
  const initialValues = {
    phoneNumber: "",
    street: "",
    state: "",
    zip: "",
    city: "",
    description: "",
    licenses: licenses,
    languages: languages,
    specialties: specialties,
    educations: educations,
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

  const [update, { data, loading, error }] = useMutation(UPDATE_THERAPIST);

  const submit = handleSubmit(async ({ phoneNumber,
    street,
    state,
    zip,
    city,
    description,
    licenses,
    languages,
    specialties,
    educations }) => {
    try {
      clearErrors();
      const { data } = await update({
        variables: {
          therapistInput: {
            id: user.id,
            phoneNumber,
            address: {
              street,
              state,
              zip,
              city
            },
            description,
            licenses,
            languages,
            specialties,
            education: educations
          }
        }
      });
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
          <Col className="mx-auto" lg="9" md="9">
            <Card className="card-register" style={{ maxWidth: "600px" }}>
              <h3 className="title mx-auto">Tell us more about you</h3>

              {errors?.generic && (
                <Alert color="danger" isOpen={errors?.generic}>
                  {errors.generic.message}
                </Alert>
              )}
              <form tag={Form} className="register-form" onSubmit={submit}>
                <Row>
                  <Col>
                    <label>Description</label>
                    <InputGroup
                      className={
                        errors.description ? "has-danger" : "form-group-no-border"
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-align-left-2" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <textarea
                        className="form-control"
                        placeholder="Short description of yourself"
                        name="description"
                        {...register("description")}
                      />
                    </InputGroup>
                    {errors?.description && (
                      <Alert color="danger" isOpen={errors?.description}>
                        {errors.description.message}
                      </Alert>
                    )}

                    <label>Phone number</label>
                    <InputGroup
                      className={
                        errors.phoneNumber ? "has-danger" : "form-group-no-border"
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-mobile" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Your phone number"
                        name="phoneNumber"
                        {...register("phoneNumber")}
                      />
                    </InputGroup>
                    {errors?.phoneNumber && (
                      <Alert color="danger" isOpen={errors?.phoneNumber}>
                        {errors.phoneNumber.message}
                      </Alert>
                    )}
                    <label>
                      Started working on{" "}
                      <small > (Start By Year )</small>
                    </label>
                    <div>
                      <FormGroup className="d-flex align-items-center mb-0">
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
                            errors?.yearsOfExperience
                              ? "text-danger me-2"
                              : "form-group-no-border me-2"
                          }
                        >
                          <option value="">Year</option>
                          {yearOptions}
                        </Input>
                      </FormGroup>
                    </div>
                    {errors?.yearsOfExperience && (
                      <Alert color="danger" isOpen={errors?.yearsOfExperience}>
                        {errors?.yearsOfExperience?.message}
                      </Alert>
                    )}
                    <div className="text-center d-flex align-items-baseline justify-content-between mb-1">

                      <label>Languages</label> <Button className="btn-round" color="primary" onClick={() => setLanguages([...languages, ""])}><i className="nc-icon nc-simple-add"></i></Button>
                    </div>
                    {languages.map((language, index) => {
                      const fieldName = `languages[${index}]`;
                      return (
                        <InputGroup
                          className={
                            errors?.languages
                              ? "has-danger"
                              : "form-group-no-border"
                          }
                          key={index}
                        >

                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="nc-icon nc-chat-33" />
                            </InputGroupText>
                          </InputGroupAddon>

                          <input
                            className="form-control"
                            placeholder="Language"
                            name={fieldName}
                            type="text"
                            {...register(fieldName)}
                          />
                        </InputGroup>)
                    })}
                    {errors?.languages && (
                      <Alert color="danger" isOpen={errors?.languages}>
                        You should fill all your languages                     </Alert>
                    )}
                  </Col>
                  <Col>
                    <label>Adress</label>
                    <InputGroup
                      className={
                        (errors.street || errors.state || errors.zip || errors.city) ? "has-danger" : "form-group-no-border"
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-pin-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <input
                        className={errors.street ? styles.address + " " + styles.errorAddress : styles.address}
                        placeholder="Street"
                        name="street"
                        type="text"
                        {...register("street")}
                      />
                      <input
                        className={errors.state ? styles.address + " " + styles.errorAddress : styles.address}
                        placeholder="State"
                        name="state"
                        type="text"
                        {...register("state")}
                      />
                      <input
                        className={errors.zip ? styles.address + " " + styles.errorAddress : styles.address}
                        placeholder="Zip"
                        name="zip"
                        type="text"
                        {...register("zip")}
                      />
                      <input
                        className={errors.city ? styles.address + " " + styles.errorAddress : styles.address}
                        placeholder="City"
                        name="city"
                        type="text"
                        {...register("city")}
                      />
                    </InputGroup>
                    {(errors?.street || errors?.state || errors?.zip || errors?.city) && (
                      <Alert color="danger" isOpen={(errors?.street || errors?.state || errors?.zip || errors?.city)}>
                        Write a valid address
                      </Alert>
                    )}
                    <div className="text-center d-flex align-items-baseline justify-content-between mb-1">

                      <label>Licenses</label> <Button className="btn-round" color="primary" onClick={() => setLicenses([...licenses, ""])}><i className="nc-icon nc-simple-add"></i></Button>
                    </div>
                    {licenses.map((license, index) => {
                      const fieldName = `licenses[${index}]`;
                      return (
                        <InputGroup
                          className={
                            errors?.licenses
                              ? "has-danger"
                              : "form-group-no-border"
                          }
                          key={index}
                        >

                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="nc-icon nc-chat-33" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <input
                            className={errors.licenses ? styles.address + " " + styles.errorAddress : styles.address}
                            placeholder="License"
                            name="license"
                            type="text"
                            {...register(`licenses[${index}].license`)}
                          />
                          <input
                            className={errors.licenses ? styles.address + " " + styles.errorAddress : styles.address}
                            placeholder="State"
                            name="state"
                            type="text"
                            {...register(`licenses[${index}].state`)}
                          />
                          <input
                            className={errors.licenses ? styles.address + " " + styles.errorAddress : styles.address}
                            placeholder="Type"
                            name="typeL"
                            type="text"
                            {...register(`licenses[${index}].typeL`)}
                          />

                        </InputGroup>)
                    })}
                    {errors?.licenses && (
                      <Alert color="danger" isOpen={errors?.licenses}>
                        You should fill all your licenses                     </Alert>
                    )}

                    <div className="text-center d-flex align-items-baseline justify-content-between mb-1">

                      <label>Educations</label> <Button className="btn-round" color="primary" onClick={() => setEducations([...educations, ""])}><i className="nc-icon nc-simple-add"></i></Button>
                    </div>
                    {educations.map((education, index) => {
                      const fieldName = `educations[${index}]`;
                      return (
                        <InputGroup
                          className={
                            errors?.educations
                              ? "has-danger"
                              : "form-group-no-border"
                          }
                          key={index}
                        >

                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="nc-icon nc-chat-33" />
                            </InputGroupText>
                          </InputGroupAddon>

                          <input
                            className="form-control"
                            placeholder="Education"
                            name={fieldName}
                            type="text"
                            {...register(fieldName)}
                          />
                        </InputGroup>)
                    })}
                    {errors?.educations && (
                      <Alert color="danger" isOpen={errors?.educations}>
                        You should fill all your educations                       </Alert>
                    )}
                    <br />
                  </Col>
                </Row>
                <div className="text-center d-flex align-items-baseline justify-content-center mb-1" style={{ gap: "1rem" }}>
                  <label style={{}}>Specialties</label>
                  <Button className="btn-round" color="primary" onClick={() => setSpecialties([...specialties, ""])}><i className="nc-icon nc-simple-add"></i></Button>
                </div>

                {specialties.map((specialtie, index) => {
                  const fieldName = `specialties[${index}]`;
                  return (
                    <InputGroup
                      className={
                        errors?.specialties
                          ? "has-danger"
                          : "form-group-no-border"
                      }
                      key={index}
                    >

                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-chat-33" />
                        </InputGroupText>
                      </InputGroupAddon>

                      <input
                        className="form-control"
                        placeholder="Specialty"
                        name={fieldName}
                        type="text"
                        {...register(fieldName)}
                      />
                    </InputGroup>)
                })}
                {errors?.specialties && (
                  <Alert color="danger" isOpen={errors?.specialties}>
                    You should fill all your specialties                    </Alert>
                )}

                <Button
                  block
                  className="btn-round"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </form>

            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default withAuth(isVerified(ProfileCreation));
