import { useMutation,gql,useQuery } from '@apollo/client';
import { useState,useEffect } from "react";
import {  useNavigate,useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from './Rdv.module.scss'
import { useSelector } from "react-redux";
import moment from 'moment-timezone';
import { selectUser } from "../../store/users/users.selectors";
import{DatePickerComponent, TimePickerComponent}from'@syncfusion/ej2-react-calendars'
import {
  Button,
  Card,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";


const USERS_QUERY = gql`
  query {
    users {
      id
      name
      therapist{
      availability{day,startTime,endTime}}
          }
  }
`;
export const BOOK_APPOINTMENT=gql`
mutation bookAppointment($patient:ID,$therapist: ID,$date: String,$duration: Int,$notes: String,$status: String){
  bookAppointment(patient:$patient,therapist:$therapist,date:$date,duration:$duration,notes:$notes,status:$status)
} 

`;

const GET_APPOINTMENTSDATES= gql`
query  {
  getAppointments {
    id
    therapist
    date

  }
}`;



function Rdv (){
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const user = useSelector(selectUser);
  const [bookAppointment] = useMutation(BOOK_APPOINTMENT);
  const userid = useParams('userid');
  const [note, setNote]= useState('note');
  const [therapist,setTherapist]= useState('therapist');
  const [date,setDate]= useState('date');
  const [time,setTime]= useState('time');

  const [selectedValue, setSelectedValue] = useState('');
  const [disabledDates, setDisabledDates] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  
  const initialValues = {
     
    therapist: "",
    date: "",
    note:"",
    
  };
  const {
    
    handleSubmit,
    formState: { errors, isSubmitting,isSubmitted},
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    
  });
  const { loading, error, data } = useQuery(USERS_QUERY);
  const { loadingDates, errorDates, dataDates } = useQuery(GET_APPOINTMENTSDATES);

  if (loading ) return <p>Loading...</p>;
  if (error) return <p>Error </p>;
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
   const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 -> Sunday, 6 -> Saturday
  }
  
  // useEffect(() => {
  //   if (dataDates) {
  //     const dates = dataDates.getAppointments.map((a) => new Date(a.date));
  //     setDisabledDates(dates);
  //   }
  // }, [dataDates]);
  // const bookedDates = dataDates ? dataDates.appointmentDates : [];

  // const isDateBooked = (date) => {
  //   return bookedDates.some((bookedDate) => {
  //     const formattedBookedDate = new Date(bookedDate).toISOString().slice(0, 16);
  //     return formattedBookedDate === date;
  //   });
  // };

  // const isDateDisabled = (date) => {
  //   return isDateBooked(date);
  // };
  
  function cleanUpAvailability(array) {
    let newArray = [];
    let lastCase = { day: "", startTime: "", endTime: "" };
    array.forEach((item) => {
      if (
        item.startTime === lastCase.startTime &&
        item.endTime === lastCase.endTime
      ) {
        lastCase = {
          ...lastCase,
          day: lastCase.day.replace(/\-.*/, "") + "-" + item.day,
        };
      } else {
        if (lastCase.day !== "") {
          newArray.push(lastCase);
        }
        lastCase = item;
      }
    });
    return newArray;
  }
  
  
  const submit=handleSubmit(async ({}) => {
    //clearErrors();

    const timerdv=new Date(time);
    const daterdv=new Date(date);
    console.log(timerdv.getHours());
    daterdv.setHours(timerdv.getHours()+1)
    console.log(daterdv)
    try {
      
      console.log(date)
      await bookAppointment ({ variables: { 
        "patient":user.id,
        "therapist":selectedValue,
        "date":daterdv,
        "duration":1,
        "notes":note,
        "status":"Scheduled"
      } });

      setErrorMessage("appointment booked");
      navigate("/appointmentbooked");
        console.log("succes")
      
      
    } catch (error) {
      setErrorMessage(error.message);
      //alert(error.message);
      console.log(data.GET_APPOINTMENTSDATES)
      console.log(data)
    }
  });
  const handleDateChange = (args) => {
    setSelectedDate(args.value);
  };
  //console.log(data);
  const minDate = new Date("04/02/2023 9:00 AM")
  const maxDate = new Date("12/29/2023 6:00 PM");
 
  const min = new Date();
  min.setHours(9, 0, 0);

  const max = new Date();
  max.setHours(18, 0, 0);
  console.log(selectedValue);

    return (
        <>
  <div>
        <div  className="section-appo"
           style={{
           backgroundImage:
          "url(" + require("../../assets/img/appo.jpg") + ")",
           }}>
         <h2>Get Your Appointment </h2>
         <h4>Home - Appoitment</h4>

        </div>
       
<div class={`${styles.tt}`}>
  
  <div class={`${styles.card} card`}>
    <h3>Book your appoitment</h3>
    <form action="https://formbold.com/s/FORM_ID">
      <div class={`${styles.formboldmb5}`}>
        <select class="browser-default custom-select"  onChange={handleSelectChange}>
        <option selected>Choose your doctor here</option>
      {data.users.map(item=> (
        <option key={item.id} value={item.id} >
          {item.name}
        </option>
      ))}

    </select>
      </div>
    


      <div class={`${styles.formboldmb5}`}
          >
                   <label for="date"class={`${styles.formboldformlabel}`}> Reason  </label>

        <textarea
          type="text"
          name="note"
           onChange={(e) => setNote(e.target.value)} 
          id="note"
          placeholder="Write your message here..."
          class={`${styles.formboldforminput}`}
        />
      </div>
     
      <div class="flex flex-wrap formbold--mx-3">
        <div class="w-full sm:w-half formbold-px-3">
          <div class="formbold-mb-5 w-full">
            <label for="date"class={`${styles.formboldformlabel}`}> Date </label>
           
            <DatePickerComponent
            inputProps={{
              style:{width:'200px',height:'30px'}
            }}
            
         
        renderDayCell={(args) => {
          if (isWeekend(args.date)) {
            args.isDisabled = true;
          }
        }}
          
               onChange={(e) => setDate(e.target.value)} 
              
              placeholder="choose a date and time for your appointment "
              step={60}
              format="dd-MMM-yy"

            ></DatePickerComponent>
            <TimePickerComponent
            format='HH:mm'
            min={min}
            max={max}
            step={60}
            placeholder='Enter Time'
            onChange={(e) => setTime(e.target.value)} 

            ></TimePickerComponent>
          </div>
        </div>
        
        
      </div>
      <div class=" d-flex flex-column text-center px-5 mt-3 mb-3"> <small class="agree-text">By Booking this appointment you agree to the</small> <a href="#" class="terms">Terms & Conditions</a> </div> 

    <div>
        <button class={`${styles.formboldbtn}`} onClick={submit}>Book Appointment</button>
        
      </div>
      {errorMessage === 'appointment booked' ? (
       <div style={{ color: 'green' }}>{errorMessage}</div>
      ) : (
        <div style={{ color: 'red' }}>{errorMessage}</div>
        )
      }
    </form>
  </div>
  <div class={`${styles.work}`}>
    <h3 class={`${styles.fontt}`}>Working Hours</h3>
   
 {data.users.map(item => {return(
   (item.id ===selectedValue) && (cleanUpAvailability(item.therapist.availability).map((day, index) => (
                  <div className="row" style={{color:'white'}}>
                    <div className="col-md-8">{day.day}</div>
                    <div className="col-md-4">
                      {day.startTime} - {day.endTime}
                    </div>
                  </div>
                ))))})}
                <div className="row">
                  <div className="col-md-8" style={{color:'white'}}>Sunday</div>
                  <div className="col-md-4" style={{color:'white'}}>Closed</div>
                </div>

    </div>
</div>
  </div>


        </>
   
  );
}

export default Rdv ;