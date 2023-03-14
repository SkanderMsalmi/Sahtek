import styles from  "./resetPassword.module.scss";
import { useMutation,gql } from '@apollo/client';
import { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
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
  Alert,
} from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";

export const RESET_PASSWORDLink = gql`
  mutation resetPasswordlink($userid:String!,$token:String!,$newpassword:String!){
    resetPasswordlink(userid:$userid,token:$token,newpassword:$newpassword)
  }
`;




function Resetpassword (){
    const navigate = useNavigate();
    const [newpassword]= useState('newpassword');
    const [resetPasswordLink] = useMutation(RESET_PASSWORDLink);
    const tokenValue = useParams('token');
    const userid = useParams('userid');
    const schema = yup.object().shape({
        newpassword: yup
        .string()
        .required("Please Enter your password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
        password2: yup
        .string()
      .required("Confirm your password ")
      .oneOf([yup.ref("newpassword"), null], "Passwords must match"),
    });
    const initialValues = {
    
      newpassword: "",
      password2: "",
      
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


const submit=handleSubmit(async ({newpassword}) => {
    //clearErrors();
    try {
      await resetPasswordLink({ variables: { 
        "newpassword":newpassword,
        "userid":userid.id,
        "token":tokenValue.token} });

        alert("succes!");
        console.log("succes")
        navigate("/login")
      
    } catch (error) {
    console.log("aaaa")

    }
  });


    return (
        // <section  style={{
        //   backgroundImage:
        //     "url(" + require("../../assets/img/login-image.jpg") + ")",
        // }}>
    //         <div className={styles.formBox}>
    //             <form onSubmit={handleSubmit}>
    //                 <h2 style={{color:"#fff"}}>Reset Password</h2>
                    
    //                 <div className={styles.inputbox}>
    //                                           <label htmlFor="password" className={styles.userLabel} >Enter New Password</label>

    //                     <input {...register("password")}name="newpassword"type="password" className={styles.userInput} required maxLength={10} minLength={6} value={newpassword} onChange={(e)=> setnewPassword(e.target.value)} />
    //                     {errors?.password && (
    //               <Alert color="danger" isOpen={errors?.password}>
    //                 {errors.password.message}
    //               </Alert>
    //             )}
    //             <br />
    //             {errors?.generic && (
    //               <Alert color="danger" isOpen={errors?.generic}>
    //                 {errors.generic.error.message}
    //               </Alert>
    //             )}
    //                 </div>
    //                 <div className={styles.inputbox}>
    //                     <input name="password2" type="password" className={styles.userInput} required maxLength={10} minLength={6}  value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />
    //                     <label htmlFor="password" className={styles.userLabel} >confirm Password</label>
    //                 </div>
                   
    //                <button>Submit</button>
                   
    //             </form>

    //         </div>
    //     </section>
    // )
    <div
    className="section section-image section-login"
    style={{
      backgroundImage:
        "url(" + require("../../assets/img/login-image.jpg") + ")",
    }}
  >
    <Container  >
        <Row>
          <Col className="mx-auto" lg="4" md="6">
            <Card className="card-register">
              <Form className="register-form" onSubmit={submit} >
              <label>new Password</label>
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
                    placeholder="new password"
                    name="newpassword"
                    type="password"
                    
                    {...register("newpassword")}

                  />
                </InputGroup>
                {errors?.newpassword && (
                  <Alert color="danger" isOpen={errors?.newpassword}>
                    {errors.newpassword.message}
                  </Alert>
                )}
                <label>Confirm Password</label>
                <InputGroup
                  className={
                    errors.password2
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
                    name="password2"
                    type="password"
                    {...register("password2")}
                    
                  />
                </InputGroup>
                {errors?.password2 && (
                  <Alert color="danger" isOpen={errors?.password2}>
                    {errors.password2.message}
                  </Alert>
                )}

                <Button
                  
                  className="btn-round"
                  color="danger"
                  type="submit"
                >
                  change password
                </Button>
              </Form>
              
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Resetpassword ;