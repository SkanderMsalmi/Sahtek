import React, { useState } from 'react';
import './ChooseRole.scss';
import { useNavigate } from 'react-router-dom';
const ChooseRole = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Registering as ${role}`);
    // code to register the user with the selected role
    navigate(`/register/${role}`)
  };

  return (
    <div className={"choose"}>
      <h2>Welcome, Are You ?</h2>
      <form onSubmit={handleSubmit} >
        <div className={"choosing"}> 
        <label className={`radio-card ${role === 'Therapist' ? 'selected' : ''}`}>
          <input type="radio" name="role" value="Therapist" checked={role === 'Therapist'} onChange={handleRoleChange} />
          <div className='text-center'>
            {/* <img src={therapist} alt="" height="350px" className='mb-5'/> */}
            <h3>Therapist</h3>
          </div>
        </label>
        <label className={`radio-card ${role === 'Patient' ? 'selected' : ''}`}>
          <input type="radio" name="role" value="Patient" checked={role === 'Patient'} onChange={handleRoleChange} />
          <div className='text-center'>
            {/* <img src={patient} alt="" height="350px"  className='mb-5'/> */}
            <h3>Patient</h3>

          </div>
        </label>
        </div>
        <div style={{maxWidth:"30%", margin:"auto"}}>
           <button type="submit" className='buttonRegister' disabled={!role}>
          Register
        </button>
  </div>       
      </form>
    </div>
  );
};

export default ChooseRole;
