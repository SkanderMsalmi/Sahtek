// import styles from "./forgetpassword.module.scss";
// import { useMutation,gql } from '@apollo/client';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Resetpassword from "../ResetPassword/resetPassword";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

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
import { gql } from "@apollo/client";

export const RESET_PASSWORD = gql`
  mutation resetPassword($email: String!) {
    resetPassword(email: $email)
  }
`;

function Forgetpassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [resetPassword] = useMutation(RESET_PASSWORD);
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("You should insert your email")
      .email("Please insert a valid email"),
  });
  const initialValues = {
    email: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(schema),
  });
  // const [password,setPassword]= useState('');
  // const [userType,setUserType]= useState('Patient');

  // const handleSubmit = (event) => {
  //     event.preventDefault();
  //     try {
  //         const { data } = await resetPassword({ variables: { email } });
  //         if (data.resetPassword) {
  //           alert('Reset password link sent!');
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     // console.log(email,userType);
  //     // const data={
  //     //     email: this.email
  //     // };

  //     // Forgetpassword({ variables: { email,userType } });
  //     navigate("/");
  //   };
  const submit = handleSubmit(async ({ email }) => {
    //e.preventDefault();
    try {
      const { data } = await resetPassword({ variables: { email } });
    } catch (error) {
      alert("email invalid!");
    }
  });

  return (
    // <section
    // style={{
    //   backgroundImage:
    //     "url(" + require("../../assets/img/login-image.jpg") + ")",
    // }}>
    //     <div className={styles.formBox}>
    //         <form onSubmit={handleSubmit}>
    //             <h2 style={{color:"#fff"}}>Forget Password</h2>
    //             <div className={styles.inputbox}>
    //                 <i className="fa-sharp fa-regular fa-envelope"></i>
    //                 <input type="text" className={styles.userInput} value={email} onChange={(e)=> setEmail(e.target.value)} required/>
    //                 <label htmlFor="email" className={styles.userLabel} >Email</label>
    //             </div>

    //            <button onClick={handleSubmit}>Send E-mail</button>
    //            <h6 className={styles.back}><a href="/login">Back to sign in</a></h6>

    //         </form>

    //     </div>
    // </section>
    <div
      className="section section-image section-login"
      style={{
        backgroundImage:
          "url(" + require("../../assets/img/login-image.jpg") + ")",
      }}
    >
      <Container>
        <Row>
          <Col className="mx-auto " lg="4" md="6">
            <Card
              className="card-register"
              style={{
                maxWidth: "650px",
              }}
            >
              {isSubmitting && <Alert>email sent — check it out!</Alert>}

              <Form className="register-form" onSubmit={submit}>
                <h2 style={{ color: "#fff" }}>Forget Password</h2>

                <label>
                  Enter the email address associated with your account and we'll
                  send you a link to reset your password
                </label>
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

                <Button
                  block
                  disabled={isSubmitted}
                  className="btn-round"
                  color="danger"
                  type="submit"
                >
                  Send Email
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
  // <section class="login section">
  // <div class="container">
  // <div class="inner">
  // <div class="row">
  // <div class="col-lg-6">
  // <div class="login-left">
  // </div>
  // </div>
  // <div class="col-lg-6">
  // <div class="login-form">
  // <h2>Forget Password</h2>
  // <form class="form" method="post" action="#">
  // <div class="row">
  // <div class="col-lg-6">
  // <div class="form-group">
  // <input type="text" name="name" placeholder="First Name"/>
  // </div>
  // </div>
  // <div class="col-lg-6">
  // <div class="form-group">
  // <input type="email" name="email" placeholder="Your Email" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
  // </div>
  // </div>

  // <div class="col-12">
  // <div class="form-group login-btn">
  // <button class="btn" type="submit">Send-Email</button>
  // </div>

  // <a href="/login" class="lost-pass">back to sign in</a>
  // </div>
  // </div>
  // </form>

  // </div>
  // </div>
  // </div>
  // </div>
  // </div>
  // </section>
}

export default Forgetpassword;
