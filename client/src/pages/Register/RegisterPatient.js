 
import styles from "./Register.module.scss";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
 import { Link } from "react-router-dom";
function RegisterPatient (){

  const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		const url = "http://localhost:8080/api/users";
	// 		const { data: res } = await axios.post(url, data);
	// 		setMsg(res.message);
	// 	} catch (error) {
	// 		if (
	// 			error.response &&
	// 			error.response.status >= 400 &&
	// 			error.response.status <= 500
	// 		) {
	// 			setError(error.response.data.message);
	// 		}
	// 	}
	// };
  
return(
  <div className='flex-fill d-flex justify-content-center align-items-center'>
     <form className={styles.form_container} >
        <h1>Create Account</h1>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={handleChange}
          value={data.firstName}
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
          value={data.lastName}
          required
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={data.email}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={data.password}
          required
          className={styles.input}
        />
        {error && <div className={styles.error_msg}>{error}</div>}
        {msg && <div className={styles.success_msg}>{msg}</div>}
        <button type="submit" className={styles.green_btn}>
          Sing Up
        </button>
      </form>
  </div>
     
    
            

    );
}

export default RegisterPatient;