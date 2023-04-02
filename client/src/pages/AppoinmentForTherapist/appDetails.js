import React, { useState } from 'react';
import styles from "./AppDetails.module.scss"
const AppointmentDetails = ({ appointment }) => {


  return (
//     <> <h2>Appointment Details</h2>
//     <form className={`${styles.form}`}> 
//     <dl>
//       <dt>Patient Name : </dt>
//       <dt>Reason : </dt>
//       <dd></dd>
//       <dt>Appointment Date</dt>
//       <input type="Date" id="appointmentDate" name="appointmentDate" />
//       <dd></dd>
      
//       <dd></dd>
//       <dt>Status</dt>
//       <select id="status">
//   <option value="Scheduled">Scheduled</option>
//   <option value="Confirmed">Confirmed</option>
//   <option value="Cancelled">Cancelled</option>
//   <option value="Completed"selected>Completed</option>
// </select>      <dd></dd>
//       <dt>Notes</dt>
//       <textarea id="notes" name="notes" ></textarea>
//     </dl>
//       <>
//         <button >Save Appointment</button>
//         <button >Delete Appointment</button>
//         <button>Back</button>
   
//       </>
 

//       </form> 
//   </>
<div  className="section section-image section-login"
 style={{
        backgroundImage:
          "url(" + require("../../assets/img/login-image.jpg") + ")",
      }}>
<div class="container mt-5 mb-5 d-flex justify-content-center">
    <div class="card px-1 py-4">
        <div class="card-body">
            <h6 class="card-title mb-3">Appointment Details</h6>
            <label>Patient Name</label>
            <label>REASON FOR VISIT</label>
            <div class="d-flex flex-row"> <label class="radio mr-1"> <input type="radio" name="Scheduled" value="Scheduled" checked/> <span> <i class=""></i> Scheduled </span> </label> <label class="radio"> <input type="radio" name="Confirmed" value="Confirmed"/> <span> <i class="bi bi-check-lg"></i> Confirmed</span> </label> <label class="radio mr-1"> <input type="radio" name="Cancelled" value="Cancelled" /> <span> <i class=""></i> Cancelled </span> </label></div>
            <div class="row">
                <div class="col-sm-12">
                    <div class="form-group">
                         <label for="name">Date</label>  <input class="form-control" type="Date" placeholder="Date"/> </div>
                         <div class="w-full sm:w-half formbold-px-3">
          <div class="formbold-mb-5">
            <label for="time" > Time </label>
            <input
              type="time"
              name="time"
              id="time"
            
            />
        
        </div>
      </div>  
                </div>
            </div>
        
            
            
             <button class="btn btn-primary btn-block confirm-button">Confirm</button>
        </div>
    </div>
</div>
</div>
  );
  };
  
  export default AppointmentDetails;