import styles from  "./forgetpassword.module.scss";
// import { useMutation,gql } from '@apollo/client';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import Resetpassword from "../ResetPassword/resetPassword";

import { gql } from '@apollo/client';

export const RESET_PASSWORD = gql`
  mutation resetPassword($email: String!) {
    resetPassword(email: $email)
  }
`;


function Forgetpassword (){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
     const [resetPassword] = useMutation(RESET_PASSWORD);

     
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { data } = await resetPassword({ variables: { email } });
          if (data.resetPassword) {
            alert('Reset password link sent!');
          }
        } catch (error) {
          alert('email invalid!')
        }
      };

    return (
        <section
        style={{
          backgroundImage:
            "url(" + require("../../assets/img/login-image.jpg") + ")",
        }}>
            <div className={styles.formBox}>
                <form onSubmit={handleSubmit}>
                    <h2 style={{color:"#fff"}}>Forget Password</h2>
                    <div className={styles.inputbox}>
                        <i className="fa-sharp fa-regular fa-envelope"></i>
                        <input type="text" className={styles.userInput} value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                        <label htmlFor="email" className={styles.userLabel} >Email</label>
                    </div>
                   
                   <button onClick={handleSubmit}>Send E-mail</button>
                   <h6 className={styles.back}><a href="/login">Back to sign in</a></h6>
                   
                </form>

            </div>
        </section>
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
    )
}

export default Forgetpassword ;