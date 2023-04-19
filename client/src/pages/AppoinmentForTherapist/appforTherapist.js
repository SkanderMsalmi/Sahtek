// Appointments.js
import styles from "./AppforTherapist.module.scss"
import React, { useState, useEffect } from 'react';
import AppointmentDetails from './appDetails';
import { Container } from "reactstrap";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

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
      patient{id 
        name
      }
      therapist{id
        name}
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
  const navigate = useNavigate();

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
        navigate("/appforTherapist")
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
            <div className="col-md-8 3">
                <div className="rounded">
                    <div className="table-responsive table-borderless">
                        <h1>Appointments</h1>
              {data.getAppointmentsByTherapist.map((item) => (

    <MDBCard alignment='center' className="card h-100">{console.log(item)}
      <MDBCardHeader>Appointment</MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle>Date: {new Date(item.date*1).getDate()}/{new Date(item.date*1).getMonth()}/{new Date(item.date * 1).getFullYear() }   {new Date(item.date * 1).getHours() }:00 HH </MDBCardTitle>
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
        <button type="button" class="btn btn-success" onClick={() =>
        handleButtonClick(item.id)} disabled={item.status==='Confirmed'}  >Confirme</button>
      </div>
    </MDBCard> ))}
   
                    </div>
                </div>
            </div>
        </div>
    </div>




  );
};

export default Appointments;

