import styles from  "./Register.module.scss";

function Register (){
    return (
        <section>
        <div className={styles.formBox}>
            <form action="">
                <h2 style={{color:"#fff"}}>Register</h2>
                <div className="row">
                <div className="col-md-6 mb-2">

                <div className={styles.inputbox}>
                        <input type="text" className={styles.userInput} required />
                        <label htmlFor="name" className={styles.userLabel} >First Name</label>
                    </div>

                </div>
                <div className="col-md-6 mb-2">

                <div className={styles.inputbox}>
                        <input type="text" className={styles.userInput} required />
                        <label htmlFor="lastname" className={styles.userLabel} >Last Name</label>
                    </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-1 pb-1">

                <div className={styles.inputbox}>
                        <input type="password" className={styles.userInput} required />
                        <label htmlFor="password" className={styles.userLabel} >Password</label>
                    </div>

                </div>
                <div className="col-md-6 mb-1 pb-1">

                <div className={styles.inputbox}>
                        <input type="password" className={styles.userInput} required />
                        <label htmlFor="password" className={styles.userLabel} >Confirm Password</label>
                    </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-2 d-flex align-items-center">

                <div className={styles.inputbox}>
                        <input type="email" className={styles.userInput} required />
                        <label htmlFor="email" className={styles.userLabel} >Email</label>
                    </div>

                </div>
                <div className="col-md-6 mt-4" style={{color:"white"}}>

                  <h6 className="mb-2 pb-1" style={{color:"#fff"}}>Gender: </h6>

                  <div className=" form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender"
                      value="Female"  />
                    <label className="form-check-label" htmlFor="femaleGender">Female</label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender"
                      value="Male" />
                    <label className="form-check-label" htmlFor="maleGender">Male</label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="otherGender"
                      value="Other" />
                    <label className="form-check-label" htmlFor="otherGender">Other</label>
                  </div>

                </div>
              </div>
              <div className="row justify-content-center"  >
              <div className={styles.inputbox} >
                        <input type="date" className={styles.userInput} required />

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