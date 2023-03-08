function Login (){
    return (
<<<<<<< Updated upstream
        <div className="container">
            <div className="item">
                <h2 className="logo">Sahtek</h2>
                <div className="text-item">
                    <h2>Welcome ! <br/><span>To Our Website</span></h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam assumenda minus, laborum nisi doloribus eius dicta voluptates numquam nulla cum?</p>
                </div>
=======
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
                    <div className={styles.forget+" form-check"}>
                        <label className="lab form-check-label" htmlFor="rm"><input type="checkbox"  id="rm" className="form-check-input"/>Remeber Me <a href="/forgetpassword" style={{marginLeft:"15px"}}> Forget Password </a></label>
                        
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

>>>>>>> Stashed changes
            </div>
        </div>
    )
}

export default Login;