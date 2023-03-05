import styles from  "./Login.module.scss";
import { useMutation,gql } from '@apollo/client';
import { useState } from "react";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password,userType:"Patient") {
      success
    }
  }
`;


function Login (){

    const [email,setEmail]=useState('');
    const [password,setPassword]= useState('');
    const [userType,setUserType]= useState('Patient');
    const [login,{data,loading,error}] = useMutation(LOGIN_MUTATION);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        login({ variables: { email, password,userType } });
      };

    return (
        <section>
            <div className={styles.formBox}>
                <form onSubmit={handleSubmit}>
                    <h2 style={{color:"#fff"}}>Login</h2>
                    <div className={styles.inputbox}>
                    <i className="fa-sharp fa-regular fa-envelope"></i>
                        <input type="text" className={styles.userInput} required value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <label htmlFor="email" className={styles.userLabel} >Email</label>
                    </div>
                    <div className={styles.inputbox}>
                    <i className="fa-solid fa-lock"></i>
                        <input type="password"  className={styles.userInput}  required value={password} onChange={(e)=> setPassword(e.target.value)} />
                        <label className={styles.userLabel} htmlFor="password" >Password</label>
                    </div>
                    <div className={styles.forget}>
                        <label className="lab" htmlFor=""><input type="checkbox"  />Remeber Me <a href="#" style={{marginLeft:"15px"}}> Forget Password </a></label>
                        
                    </div>
                    <button>Login</button>
                    <div className={styles.register}>
                        <p>Don't have an account ? <a href="#">Register</a></p>
                    </div>
                    {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {data && data.login.success && <p>Login successful!</p>}
      {data && !data.login.success && <p>{data.login.message}</p>}
                </form>

            </div>
        </section>
    )
}

export default Login;