import styles from  "./Login.module.scss";

function Login (){
    return (
        <section>
            <div className={styles.formBox}>
                <form action="">
                    <h2>Login</h2>
                    <div className={styles.inputbox}>
                    <i className="fa-sharp fa-regular fa-envelope"></i>
                        <input type="text" className={styles.userInput} required />
                        <label htmlFor="email" className={styles.userLabel} >Email</label>
                    </div>
                    <div className={styles.inputbox}>
                    <i class="fa-solid fa-lock"></i>
                        <input type="password"  className={styles.userInput}  required/>
                        <label className={styles.userLabel} htmlFor="password" >Password</label>
                    </div>
                    <div className={styles.forget}>
                        <label className="lab" htmlFor=""><input type="checkbox"  />Remeber Me <a href="#" style={{marginLeft:"15px"}}> Forget Password </a></label>
                        
                    </div>
                    <button>Login</button>
                    <div className={styles.register}>
                        <p>Don't have an account ? <a href="#">Register</a></p>
                    </div>
                </form>

            </div>
        </section>
    )
}

export default Login;