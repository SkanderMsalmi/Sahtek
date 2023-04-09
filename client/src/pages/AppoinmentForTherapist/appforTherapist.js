// Appointments.js
import styles from "./AppforTherapist.module.scss"
import React, { useState, useEffect } from 'react';
import AppointmentDetails from './appDetails';
import { Container } from "reactstrap";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { selectUser } from "../../store/users/users.selectors";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBBtn
} from 'mdb-react-ui-kit';
import { useSelector } from "react-redux";
const GET_PATIENT_NAME_QUERY = gql`
  query {
    users{
      id
      name
    }
  }
`;
export const GET_APPOINTMENTS_BYTHERAPIST = gql`
  query getAppointmentsByTherapist($therapist:ID!) {
    getAppointmentsByTherapist(therapist:$therapist){ 
      id
      patient
      therapist
      date
      duration
      notes
      status
    }
  }
`;
export const ACCEPT_APPOINTMENT=gql`
mutation AcceptAppointment($idAppointment:ID!){
  AcceptAppointment(idAppointment:$idAppointment)
}



`

const Appointments = () => {
  const therapist = useSelector(selectUser);

  const initialValues = {
    id: "",
};
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    
  });
  const [appointments, setAppointments] = useState([]);
 //const[dataUser,]=useQuery(GET_USER);
  //const [getAppointments] = useMutation(getAppointments);
  

    const[AcceptAppointment]=useMutation(ACCEPT_APPOINTMENT);
    const { loading:loadinguser, error:erroruser, data:datauser } = useQuery(GET_PATIENT_NAME_QUERY);
    const { loading:loading, error:error, data:data } = useQuery(GET_APPOINTMENTS_BYTHERAPIST, {
      variables: { therapist: therapist.id },
    },);

     if (loadinguser) return <p>Loading...</p>;
     if (loading) return <p>Loading...</p>;

     if (erroruser) return datauser
     if (error) return data
    
    // const
    const handleButtonClick = (idAppointment) => {
      try {
        const { data } = AcceptAppointment({ variables: { idAppointment } });
      } catch (error) {
        alert("!!!");
      }
    };
console.log(data);
   
    // const submit = handleSubmit(async ({ id }) => {
    //   //e.preventDefault();
    //   try {
    //     const { data } = await AcceptAppointment({ variables: { id } });
    //   } catch (error) {
    //     alert("!!!");
    //   }
    // });
    //  const { user } = data;
    //  const patientName = user ? user.name : '';
   
    //  return <p>Patient Name: {patientName}</p>;  
  
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error </p>;
  //console.log(datauser);

  //console.log("aaaaa");

  //console.log(userData);
  //const user = userData.user;
  // useEffect(() => {
  //   // Fetch appointments from server and update state
 
  //   fetch(getAppointments)
  //     .then((data) => data.json())
      
  // }, []);

  // const [searchTerm, setSearchTerm] = useState('');

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  // const filteredAppointments = appointments.filter((appointment) =>
  //   appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
   

<div class={`${styles.bloc}`}>
        <div className="d-flex justify-content-center row">
            <div className="col-md-10">
                <div className="rounded">
                    <div className="table-responsive table-borderless">
                        <h1>Appointments</h1>
              {data.getAppointmentsByTherapist.map((item) => (

    <MDBCard alignment='center'>
      <MDBCardHeader>Appointment</MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle>Date: {new Date(item.date*1).getDate()}/{new Date(item.date * 1).getMonth()}/{new Date(item.date * 1).getFullYear() }   {new Date(item.date * 1).getHours() }:00 HH </MDBCardTitle>
       {datauser.users.map(ite =>{return((ite.id === item.patient)&& <MDBCardText>Patient Name: {(ite.name)}</MDBCardText>)})} 
      
      </MDBCardBody>
      <MDBCardFooter className='text-muted'>Status : {item.status === 'Confirmed' ? (
        <span className="badge badge-success">Confirmed</span>
      ) : item.status==='Completed'?(
        <span className="badge badge-info">Completed</span>
      ):item.status==='Scheduled'?(
      <span className="badge badge-secondary">Scheduled</span>):
      item.status==='Cancelled'?(
      <span className="badge badge-danger">Cancelled</span>):<span></span>}</MDBCardFooter>
       <div style={{paddingLeft:'70%'}}> 
        <MDBBtn href='#' onClick={() => handleButtonClick(item.id)} disabled={item.status==='Confirmed'}  >Confirme</MDBBtn>
      </div>
    </MDBCard> ))}
    {/* {data.getAppointments.map((item) => (
                                    //<tr key={item.id}>
                                    
                                     
    <div class="card" style={{width:"18em" }}>
  <div class="card-body">
    <h5 class="card-title">Patient Name: {datauser.users.map(ite =>{
                                     return((ite.id === item.patient)&&<td> {(ite.name)}</td>)})}</h5>
    <p class="card-text">Appointment Status:  {item.status === 'Confirmed' ? (
        <span className="badge badge-success">Confirmed</span>
      ) : item.status==='Completed'?(
        <span className="badge badge-info">Completed</span>
      ):item.status==='Scheduled'?(
      <span className="badge badge-secondary">Scheduled</span>):
      item.status==='Cancelled'?(
      <span className="badge badge-danger">Cancelled</span>):<span></span>}</p>
      <button type="button" class="btn btn-success" style={{width:'100px',height:'30px'}}>Confirm</button>
  </div>
</div>
    ))} */}
                        {/* <table className="table">
                            <thead>
                                <tr>
                                    
                                    <th>Patient Name</th>
                                    <th>Reason For visit</th>
                                    <th>status</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                          {data.getAppointments.map((item) => (
                                    //<tr key={item.id}>
                                  <tr className="cell-1">
                                     {datauser.users.map(ite =>{
                                     return((ite.id === item.patient)&&<td> {(ite.name)}</td>)})}
                                     
                                     <td>{item.notes}</td>
                                    <td>
                                    {item.status === 'Confirmed' ? (
        <span className="badge badge-success">Confirmed</span>
      ) : item.status==='Completed'?(
        <span className="badge badge-info">Completed</span>
      ):item.status==='Scheduled'?(
      <span className="badge badge-secondary">Scheduled</span>):
      item.status==='Cancelled'?(
      <span className="badge badge-danger">Cancelled</span>):<span></span>}</td>
                                    <td>{new Date(item.date*1).getDate()}/{new Date(item.date * 1).getMonth()}/{new Date(item.date * 1).getFullYear() }   {new Date(item.date * 1).getHours() }:00 HH </td>
                                    {/* <label>{new Date(datau?.user?.dateOfBirth * 1).getDate()}/{new Date(datau?.user?.dateOfBirth * 1).getMonth()}/{new Date(datau?.user?.dateOfBirth * 1).getFullYear() }</label> */}
                                    {/* <td>{item.duration}</td>
                                    <button type="button" class="btn btn-success" style={{width:'100px',height:'30px'}}>Confirm</button>
                                    <button type="button" style={{width:'100px',height:'30px'}} class="btn btn-danger">Cancel</button>



                                  </tr>
                                  ))}
                                
                            </tbody>
                        </table> */}
                    </div>
                </div>
            </div>
        </div>
    </div>



//     <container className={`${styles.bloc}`}>
//       <h1>Appointments</h1>
      
//     <input type="text" placeholder="Search appointments" value={searchTerm} onChange={handleSearch} />
//       <container >
//       <table className={`${styles.table}`}>
//         <thead>
//           <tr>
//             <th>Patient Name</th>
//             <th>Appointment Date</th>
//             <th>Reason for Visit</th>
//             <th>View Details</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* {filteredAppointments.map((appointment) => ( */}
//             <tr /*key={appointment.id}*/>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td>
//                 <button >View Details</button>
//               </td>
//             </tr>
        
//         </tbody>
        
//       </table>
// </container>       
//     </container>
/* <div className={`${styles.bloc}`}>
<div class={`${styles.appointmentlist}`}>
  <h1>Appointment List</h1>
  <div class={`${styles.filterbar}`}>
    <select>
      <option value="today">Today</option>
      <option value="this-week">This Week</option>
      <option value="this-month">This Month</option>
    </select>
  </div>
  <table>
    <thead>
      <tr>
        <th>Patient Name</th>
        <th>Appointment Date</th>
        <th>Reason for Visit</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>2022-04-15 10:30 AM</td>
        <td>Check-up</td>
        <td>
          <a href="#">View Details</a>
        </td>
      </tr>
      <tr>
        <td>Jane Smith</td>
        <td>2022-04-16 2:00 PM</td>
        <td>Dental Cleaning</td>
        <td>
          <a href="#">View Details</a>
        </td>
      </tr>
      <tr>
        <td>Bob Johnson</td>
        <td>2022-04-18 1:30 PM</td>
        <td>Physical Exam</td>
        <td>
          <a href="AppoinmentDetails">View Details</a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</div> */
  );
};

export default Appointments;

