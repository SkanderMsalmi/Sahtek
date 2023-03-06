import styles from  "./Register.module.scss";
import { useMutation,gql } from '@apollo/client';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register_MUTATION = gql`
mutation RegisterPatient($name: String!, $email: String!, $password: String!, $dateOfBirth: String!) {
  registerPatient(name: $name, email: $email, password: $password, dateOfBirth: $dateOfBirth) {
    name
  }
}
`;

function Register (){
  const navigate = useNavigate();
  const [email,setEmail]=useState('');
  const [firstname,setFirstName]=useState('');
  const [lastname,setLastName]=useState('');
  const [password,setPassword]= useState('');
  const [confirmPassword,setConfirmPassword]= useState('');
  const [dateOfBirth,setdateOfBirth]= useState('');
  const [userType,setUserType]= useState('Patient');
  const [registerPatient,{data,loading,error}] = useMutation(Register_MUTATION);

  const handleSubmit = (event) => {
      event.preventDefault();
      
    const name = firstname + " " +lastname;
    if(password.match(confirmPassword)){
      registerPatient({ variables: {name,email, password, dateOfBirth } });
    navigate("/login");
    }else{
      throw error
    }
    };

    return (
        <section>
        <div className={styles.formBox}>
            <form action="" onSubmit={handleSubmit}>
                <h2 style={{color:"#fff"}}>Register</h2>
                <div className="row">
                <div className="col-md-6 mb-2">

                <div className={styles.inputbox}>
                        <input type="text" className={styles.userInput} required value={firstname} onChange={(e)=> setFirstName(e.target.value)}/>
                        <label htmlFor="name" className={styles.userLabel} value={firstname} >First Name</label>
                    </div>

                </div>
                <div className="col-md-6 mb-2">

                <div className={styles.inputbox}>
                        <input type="text" className={styles.userInput} required value={lastname} onChange={(e)=> setLastName(e.target.value)}/>
                        <label htmlFor="lastname" className={styles.userLabel} >Last Name</label>
                    </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-1 pb-1">

                <div className={styles.inputbox}>
                    <i className="fa-solid fa-lock"></i>
                        <input type="password"  className={styles.userInput}  required value={password} onChange={(e)=> setPassword(e.target.value)} />
                        <label className={styles.userLabel} htmlFor="password" >Password</label>
                    </div>

                </div>
                <div className="col-md-6 mb-1 pb-1">

                <div className={styles.inputbox}>
                        <input type="password" className={styles.userInput} required value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}/>
                        <label htmlFor="password" className={styles.userLabel} >Confirm Password</label>
                    </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-2 d-flex align-items-center">

                <div className={styles.inputbox}>
                        <input type="email" className={styles.userInput} required value={email} onChange={(e)=> setEmail(e.target.value)}/>
                        <label htmlFor="email" className={styles.userLabel} >Email</label>
                    </div>

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
                        <input type="date" className={styles.userInput} required value={dateOfBirth} onChange={(e)=> setdateOfBirth(e.target.value)}/>

                    </div>
              </div>

             
              <div >
                <button>Resgister</button>
              </div>
            </form>

        </div>
    </section>
    )
}

export default Register;