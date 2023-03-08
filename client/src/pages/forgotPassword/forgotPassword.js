import styles from  "./forgetpassword.module.scss";
import { useMutation,gql } from '@apollo/client';
import { useState } from "react";
import { useNavigate } from "react-router-dom";




function Forgetpassword (){
    const navigate = useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]= useState('');
    const [userType,setUserType]= useState('Patient');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email,userType);
        const data={
            email: this.email
        };
        
        Forgetpassword({ variables: { email,userType } });
        navigate("/");
      };

    return (
        <section>
            <div className={styles.formBox}>
                <form onSubmit={handleSubmit}>
                    <h2 style={{color:"#fff"}}>Forget Password</h2>
                    <div className={styles.inputbox}>
                        <i className="fa-sharp fa-regular fa-envelope"></i>
                        <input type="text" className={styles.userInput} required value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <label htmlFor="email" className={styles.userLabel} >Email</label>
                    </div>
                   
                   <button>Send E-mail</button>
                   <h6 className={styles.back}><a href="/login">Back to sign in</a></h6>
                   
                </form>

            </div>
        </section>
    )
}

export default Forgetpassword ;