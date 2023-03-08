import styles from  "./Register.module.scss";
import { useMutation,gql } from '@apollo/client';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { REGISTER_PATIENT_MUTATION,REGISTER_THERAPIST_MUTATION } from "../../apis/users";



function Register (){
  const userType = useParams('role');

   const navigate = useNavigate();
   const [registerPatient, { loadingP, errorP, dataP }] = useMutation(
    REGISTER_PATIENT_MUTATION
  );
  const [registerTherapist, { loadingT, errorT, dataT }] = useMutation(
    REGISTER_THERAPIST_MUTATION
  );
  const validationSchema = yup.object({
    firstname: yup.string().required("Il faut préciser votre prenom").min(2,"You should enter your real first name"),
    lastname: yup.string().required("Il faut préciser votre prenom").min(2,"You should enter your real last name"),
    email: yup.string().required("Il faut préciser votre prenom").email("email invalid"),
    password: yup.string().required("Il faut préciser votre prenom").min(6,"weak password "),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    dateOfBirth: yup.date().max(new Date(Date.now() - 567648000000), "You must be at least 18 years").required("Required"),
  });
  const initialValues = {
    firstname:'',
    lastname:'',
    password:'',
    confirmPassword:'',
    email:'',
    dateOfBirth: new Date('Mon Mar 09 1998 00:00:00 GMT+0000 (UTC)')
  }
  
  const {handleSubmit,register,formState:{errors, isSubmitting},setError,clearErrors} = useForm({
    initialValues,
    resolver: yupResolver(validationSchema)
  });
  const submit = handleSubmit(async (credentials)=>{
    clearErrors();
    console.log(credentials);
    try {
      let user;
      if(userType.role === "Patient"){
       user = await registerPatient({
        variables:{
          patientInput: {
            "role": userType.role,
            "name": credentials.firstname + " " +credentials.lastname,
            "password": credentials.password,
            "email": credentials.email,
            "dateOfBirth": credentials.dateOfBirth
          }
        }
      });
    }else if(userType.role === "Therapist"){
      user = await registerTherapist({
        variables:{
          therapistInput: {
            "role": userType.role,
            "name": credentials.firstname + " " +credentials.lastname,
            "password": credentials.password,
            "email": credentials.email,
            "dateOfBirth": credentials.dateOfBirth
          }
        }
      });
    }
    console.log(user);

      navigate('/login');
    } catch (message) {
      setError('generic',{type:'generic',message})
    }
  })


  // const [firstname,setFirstName]=useState('');
  // const [lastname,setLastName]=useState('');
  // const [password,setPassword]= useState('');
  // const [confirmPassword,setConfirmPassword]= useState('');
  // const [dateOfBirth,setdateOfBirth]= useState('');
  // const [userType,setUserType]= useState('Patient');
  // const [registerPatient,{data,loading,error}] = useMutation(Register_MUTATION);

  // const handleSubmits = (event) => {
  //     event.preventDefault();
      
  //   const name = firstname + " " +lastname;
  //   if(password.match(confirmPassword)){
  //     registerPatient({ variables: {name,email, password, dateOfBirth } });
  //   navigate("/login");
  //   }else{
  //     throw error
  //   }
  //   };
  if (loadingT || loadingP) return <div>Loading...</div>;
  if (errorT ) return <div>Error: {errorT.message}</div> 
  if (errorP) return <div>Error: {errorT.message}</div> 
    return (
        <section>
        <div className={styles.formBox}>
            <form action="" onSubmit={submit}>
                <h2 style={{color:"#fff"}}>Register</h2>
                <div className="row">
                <div className="col-md-6 mb-2">

                <div className={styles.inputbox}>
                        <input type="text" className={styles.userInput}  {...register('firstname')}/>
                        <label htmlFor="name" className={styles.userLabel}  >First Name</label>
                    </div>
                        {errors.firstname && <p className="form-error">{errors.firstname.message}</p>}

                </div>
                <div className="col-md-6 mb-2">

                <div className={styles.inputbox}>
                        <input type="text" className={styles.userInput}   {...register('lastname')}  />
                        <label htmlFor="lastname" className={styles.userLabel} >Last Name</label>
                    </div>
                    {errors.lastname && <p className="form-error">{errors.lastname.message}</p>}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-1 pb-1">

                <div className={styles.inputbox}>
                    <i className="fa-solid fa-lock"></i>
                        <input type="password"  className={styles.userInput}   {...register('password')}  />
                        <label className={styles.userLabel} htmlFor="password" >Password</label>
                    </div>
                    {errors.password && <p className="form-error">{errors.password.message}</p>}

                </div>
                <div className="col-md-6 mb-1 pb-1">

                <div className={styles.inputbox}>
                        <input type="password" className={styles.userInput}  {...register('confirmPassword')} />
                        <label htmlFor="password" className={styles.userLabel} >Confirm Password</label>
                    </div>
                    {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-2 d-flex align-items-center">

                <div className={styles.inputbox}>
                        <input type="email" className={styles.userInput}  {...register('email')} />
                        <label htmlFor="email" className={styles.userLabel} >Email</label>
                    </div>
                    {errors.email && <p className="form-error">{errors.email.message}</p>}

                </div>
                {/* <div className="col-md-6 mt-4" style={{color:"white"}}>

                  <h6 className="mb-2 pb-1" style={{color:"#fff"}}>Gender: </h6>

                  <div className=" form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender"
                      value="FEMALE"  onChange={(e)=> setFirstName(e.target.value)}/>
                    <label className="form-check-label" htmlFor="femaleGender">Female</label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender"
                      value="MALE" onChange={(e)=> setFirstName(e.target.value)}/>
                    <label className="form-check-label" htmlFor="maleGender">Male</label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="otherGender"
                      value="OTHER" onChange={(e)=> set(e.target.value)}/>
                    <label className="form-check-label" htmlFor="otherGender">Other</label>
                  </div>

                </div> */}
              </div>
              <div className="row justify-content-center"  >
              <div className={styles.inputbox} >
                        <input type="date" className={styles.userInput}  {...register('dateOfBirth')} />
                        {errors.dateOfBirth && <p className="form-error">{errors.dateOfBirth.message}</p>}

                    </div>
              </div>

             {errors.generic && ( <p className="form-error"> {errors.generic.message}</p>)}
              <div >
                <button className="register" disabled={isSubmitting}>Resgister</button>
              </div>
              <div className={styles.forget+" form-check"}>
                        <label className="lab form-check-label" htmlFor="">Already have an account? <a href="#" > <strong>Login instead</strong></a></label>
                        
                    </div>
            </form>

        </div>
    </section>
    )
}

export default Register;