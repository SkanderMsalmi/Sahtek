import styles from  "./resetPassword.module.scss";
import { useMutation,gql } from '@apollo/client';
import { useState } from "react";
import { useNavigate } from "react-router-dom";




function Resetpassword (){
    const navigate = useNavigate();
    const [email,setEmail]=useState('');
    const [userType,setUserType]= useState('Patient');
    const [newpassword,setnewPassword]= useState('');
  const [confirmPassword,setConfirmPassword]= useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!(newpassword.match(confirmPassword))){
        console.log("password not matched")
          }else{
            console.log("sucess!!!")
            navigate("/login")
          }
      };

    return (
        <section>
            <div className={styles.formBox}>
                <form onSubmit={handleSubmit}>
                    <h2 style={{color:"#fff"}}>Reset Password</h2>
                    <div className={styles.inputbox}>
                        <input type="password" className={styles.userInput} required maxLength={10} minLength={6} value={newpassword} onChange={(e)=> setnewPassword(e.target.value)} />
                        <label htmlFor="password" className={styles.userLabel} >Enter New Password</label>
                    </div>
                    <div className={styles.inputbox}>
                        <input type="password" className={styles.userInput} required maxLength={10} minLength={6}  value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />
                        <label htmlFor="password" className={styles.userLabel} >confirm Password</label>
                    </div>
                   
                   <button>Submit</button>
                   
                </form>

            </div>
        </section>
    )
}

export default Resetpassword ;